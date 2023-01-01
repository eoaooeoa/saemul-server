import { BadRequestException, Injectable } from '@nestjs/common';
import { AddressRepository } from 'src/address/repository/address.repository';
import { SignUpRequestDto } from '../dto/signUpRequestDto';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from '../repository/users.repository';
import { DataSource } from 'typeorm';
import { User } from '../users.entity';
import { UserResponseDto } from '../dto/userResponseDto';
import { ChangeUserInfoRequestDto } from '../dto/changeUserInfoRequestDto';
import { WalletsRepository } from 'src/wallets/repository/wallets.repository';
import { Wallet } from '../../wallets/wallet.entity';
import { Role } from 'src/common/enums/role.enum';
@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly addressRepository: AddressRepository,
    private readonly walletRepository: WalletsRepository,
    private readonly dataSource: DataSource,
  ) {}

  async createQueryRunner() {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    const { manager } = queryRunner;
    return { queryRunner, manager };
  }

  async createUser(
    signUpRequestDto: SignUpRequestDto,
    bizType: Role.User | Role.BeforePartner,
  ) {
    const { queryRunner, manager } = await this.createQueryRunner();

    try {
      const user = signUpRequestDto.toUserEntity(bizType);
      const address = signUpRequestDto.toAddressEntity();

      const foundUser = await this.usersRepository.findOneByEmail(user.email);

      if (foundUser) throw new BadRequestException('중복된 이메일입니다.');

      const wallet = Wallet.createEntityInstance();
      wallet.user = user;

      user.address = await this.addressRepository.createByTransaction(
        manager,
        address,
      );
      user.password = await this.hashPassword(user.password);
      user.wallet = wallet;

      await this.walletRepository.create(wallet);

      await this.usersRepository.createByEm(manager, user);

      await queryRunner.commitTransaction();

      return '회원가입이 완료되었습니다.';
    } catch (err) {
      await queryRunner.rollbackTransaction();
      return err;
    } finally {
      await queryRunner.release();
    }
  }

  async findOneUser(user: User) {
    return UserResponseDto.EntityToDto(user);
  }

  async updateUserPassword(user: User, password: string) {
    const newPassword = await this.hashPassword(password);
    return (await this.usersRepository.updatePassword(user, newPassword))
      ? '비밀번호가 성공적으로 변경되었습니다.'
      : new Error('에러가 발생했습니다.');
  }

  async updateUserInfo(user: User, newUserInfo: ChangeUserInfoRequestDto) {
    const { queryRunner, manager } = await this.createQueryRunner();

    try {
      if (newUserInfo.address) {
        const address = await this.addressRepository.findOne(user.address);
        const { roadAddr, detailAddr, jibun } = newUserInfo.address;
        address.roadAddr = roadAddr;
        address.detailAddr = detailAddr;
        address.jibun = jibun;
        await this.addressRepository.updateOneInTransaction(manager, address);
      }

      user.name = newUserInfo?.name ?? user.name;
      await this.usersRepository.updateOneByEm(manager, user);

      await queryRunner.commitTransaction();

      return '성공적으로 변경했습니다!';
    } catch (err) {
      await queryRunner.rollbackTransaction();
      return err;
    } finally {
      await queryRunner.release();
    }
  }

  async updateBizType(user: User, bizType: Role) {
    const result = await this.usersRepository.updateBizType(user, bizType);

    if (result.affected !== 1) throw new Error('실패했습니다.');

    return '성공적으로 변경했습니다.';
  }

  async deleteUser(user: User) {
    await this.usersRepository.deleteOne(user.id);
    return '성공적으로 삭제되었습니다.';
  }

  async hashPassword(password: string) {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  }
}
