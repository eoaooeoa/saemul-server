import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { EntityManager, Repository } from 'typeorm';
import { Wallet } from '../wallet.entity';

@Injectable()
export class WalletsRepository {
  constructor(
    @InjectRepository(Wallet)
    private readonly walletsRepository: Repository<Wallet>,
  ) {}

  async create(wallet: Wallet) {
    return await this.walletsRepository.save(wallet);
  }

  async createByEm(manager: EntityManager, wallet: Wallet) {
    return await manager.save(wallet);
  }

  async findOne(user: User) {
    return await this.walletsRepository
      .createQueryBuilder()
      .select('*')
      .from('wallet', 'w')
      .where('w.userId = :id', { id: user.id })
      .getRawOne();
  }

  async findOneByEm(manager: EntityManager, user: User) {
    return await manager
      .createQueryBuilder()
      .select('*')
      .from(Wallet, 'w')
      .where('w.userId = :userId', { userId: user.id })
      .getRawOne();
  }

  async update(userId: string, money: number) {
    return await this.walletsRepository
      .createQueryBuilder()
      .update('wallet')
      .set({ money: money })
      .where('userId = :id', { id: userId })
      .execute();
  }

  async updateByEm(manager: EntityManager, wallet: Wallet) {
    return await manager
      .createQueryBuilder()
      .update('wallet')
      .set({ money: wallet.money })
      .where('userId = :id', { id: wallet.user.id })
      .execute();
  }
}
