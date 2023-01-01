import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { WalletsRepository } from '../repository/wallets.repository';
import { DataSource } from 'typeorm';
import { User } from 'src/users/users.entity';
import { Wallet } from '../wallet.entity';

@Injectable()
export class WalletsService {
  constructor(
    private readonly walletsRepository: WalletsRepository,
    private dataSource: DataSource,
  ) {}

  async createQueryRunner() {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    const { manager } = queryRunner;
    return { queryRunner, manager };
  }

  async createWallet(user: User) {
    const { queryRunner, manager } = await this.createQueryRunner();

    try {
      const foundWallet = await this.walletsRepository.findOneByEm(
        manager,
        user,
      );

      if (foundWallet) throw new BadRequestException('이미 지갑이 있습니다!');

      const wallet = Wallet.createEntityInstance();
      wallet.user = user;

      const newWallet = await this.walletsRepository.create(wallet);

      await queryRunner.commitTransaction();

      return newWallet;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      return err;
    } finally {
      await queryRunner.release();
    }
  }

  async showMoney(user: User) {
    const wallet = await this.walletsRepository.findOne(user);

    if (!wallet) throw new UnauthorizedException('지갑을 생성해주세요!');

    return { money: wallet.money };
  }

  async chargeMoney(user: User, plusMoney: number) {
    const { queryRunner, manager } = await this.createQueryRunner();

    try {
      const wallet = await this.walletsRepository.findOneByEm(manager, user);

      if (!wallet) throw new BadRequestException('지갑을 먼저 생성해주세요!');

      wallet.user = user;
      wallet.money = Number(wallet.money) + Number(plusMoney);

      await this.walletsRepository.updateByEm(manager, wallet);

      await queryRunner.commitTransaction();

      return wallet;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      return err;
    } finally {
      await queryRunner.release();
    }
  }

  async reduceMoney(user: User, minusMoney: number) {
    const { queryRunner, manager } = await this.createQueryRunner();

    try {
      const wallet = await this.walletsRepository.findOneByEm(manager, user);

      if (!wallet) throw new BadRequestException('지갑을 먼저 생성해주세요!');
      if (wallet.money <= 0)
        throw new UnauthorizedException('머니를 충전해주세요');

      wallet.user = user;
      wallet.money = Number(wallet.money) - Number(minusMoney);

      await this.walletsRepository.updateByEm(manager, wallet);

      await queryRunner.commitTransaction();

      return wallet;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      return err;
    } finally {
      await queryRunner.release();
    }
  }
}
