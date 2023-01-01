import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from 'src/address/address.entity';
import { Role } from 'src/common/enums/role.enum';
import { EntityManager, Repository } from 'typeorm';
import { ChangeUserInfoRequestDto } from '../dto/changeUserInfoRequestDto';
import { User } from '../users.entity';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
  ) {}

  async create(userInfo: User) {
    return await this.usersRepository.save(userInfo);
  }

  async createByEm(manager: EntityManager, user: User) {
    return await manager.save(user);
  }

  async findOneByEmail(email: string) {
    return await this.usersRepository.findOne({
      where: { email },
      relations: { wallet: true, address: true },
    });
  }

  async findAllUsers(): Promise<User[] | []> {
    return await this.usersRepository.find({
      where: { bizType: Role.User },
      relations: { wallet: true, address: true },
    });
  }

  async updatePassword(user: User, password: string) {
    return await this.usersRepository.update({ id: user.id }, { password });
  }

  async updateOne(user: User, newUserInfo: ChangeUserInfoRequestDto) {
    return await this.usersRepository.update(
      { id: user.id },
      { name: newUserInfo.name },
    );
  }

  async updateOneByEm(manager: EntityManager, user: User) {
    return await manager.update(User, { id: user.id }, { name: user.name });
  }

  async updateBizType(user: User, bizType: Role) {
    return await this.usersRepository.update({ id: user.id }, { bizType });
  }

  async deleteOne(userId: string) {
    return await this.usersRepository.softDelete(userId);
  }
}
