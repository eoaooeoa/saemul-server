import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Address } from '../address.entity';

@Injectable()
export class AddressRepository {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
  ) {}

  async create(address: Address) {
    return await this.addressRepository.save(address);
  }

  async createByTransaction(manager: EntityManager, address: Address) {
    return await manager.save(address);
  }

  async findOne(address: Address) {
    return await this.addressRepository.findOne({
      where: {
        id: address.id,
      },
    });
  }

  async updateOneInTransaction(manager: EntityManager, address: Address) {
    return await manager
      .createQueryBuilder()
      .update(Address)
      .set({
        roadAddr: address.roadAddr,
        detailAddr: address.detailAddr,
        jibun: address.jibun,
      })
      .where('id = :id', { id: address.id })
      .execute();
  }

  async deleteOne(address: Address) {
    return await this.addressRepository.delete(address);
  }
}
