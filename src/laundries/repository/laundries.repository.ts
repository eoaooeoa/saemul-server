import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { EntityManager, Repository } from 'typeorm';
import { Laundry } from '../laundry.entity';

@Injectable()
export class LaundriesRepository {
  constructor(
    @InjectRepository(Laundry)
    private readonly laundriesRepository: Repository<Laundry>,
  ) {}

  async createByEm(manager: EntityManager, laundry: Laundry) {
    return await manager.save(laundry);
  }

  async findOne(laundryId: string): Promise<Laundry | undefined> {
    return await this.laundriesRepository
      .createQueryBuilder('laundry')
      .leftJoinAndSelect('laundry.address', 'Address')
      .leftJoinAndSelect('laundry.user', 'User')
      .where('laundry.id = :id', { id: laundryId })
      .getOne();
  }

  async findAll(): Promise<Laundry[] | []> {
    return await this.laundriesRepository
      .createQueryBuilder('laundry')
      .leftJoinAndSelect('laundry.address', 'address')
      .where('laundry.isApprove = 1')
      .getMany();
  }

  async findAllLaundries(): Promise<Laundry[] | []> {
    return await this.laundriesRepository.find({
      relations: { user: true, address: true },
    });
  }

  async findOneByUserId(user: User): Promise<Laundry | undefined> {
    return await this.laundriesRepository
      .createQueryBuilder('laundry')
      .leftJoinAndSelect('laundry.address', 'Address')
      .leftJoinAndSelect('laundry.user', 'User')
      .where('laundry.user.id = :id', { id: user.id })
      .getOne();
  }

  async findAllByStatus(status: boolean) {
    return this.laundriesRepository.find({
      relations: { user: true, address: true },
      where: { isApprove: status },
    });
  }

  async updateOneByEm(manager: EntityManager, laundry: Laundry) {
    return await manager
      .createQueryBuilder()
      .update(Laundry)
      .set({
        name: laundry.name,
        bizNo: laundry.bizNo,
        phoneNumber: laundry.phoneNumber,
        isApprove: laundry.isApprove,
      })
      .where('id = :id', { id: laundry.id })
      .execute();
  }

  async deleteOne(laundry: Laundry) {
    return await this.laundriesRepository.softDelete(laundry.id);
  }
}
