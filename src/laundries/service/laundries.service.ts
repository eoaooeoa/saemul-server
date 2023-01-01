import { Injectable } from '@nestjs/common';
import { AddressRepository } from 'src/address/repository/address.repository';
import { User } from 'src/users/users.entity';
import { DataSource } from 'typeorm';
import { LaundryDto } from '../dto/laundryDto';
import { UpdateLaundryDto } from '../dto/updateLaundryDto';
import { LaundriesRepository } from '../repository/laundries.repository';

@Injectable()
export class LaundriesService {
  constructor(
    private readonly laundriesRepository: LaundriesRepository,
    private readonly addressRepository: AddressRepository,
    private dataSource: DataSource,
  ) {}

  async createQueryRunner() {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    const { manager } = queryRunner;
    return { queryRunner, manager };
  }

  async createLaundry(user: User, laundryDto: LaundryDto) {
    const { queryRunner, manager } = await this.createQueryRunner();

    try {
      const addressDto = laundryDto.address;
      const laundry = laundryDto.toLaundryEntity();
      const address = addressDto.toAddressEntity();

      await this.addressRepository.createByTransaction(manager, address);
      laundry.user = user;
      laundry.address = address;
      laundry.isApprove = false;

      await this.laundriesRepository.createByEm(manager, laundry);
      await queryRunner.commitTransaction();
      return laundry;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      return err;
    } finally {
      await queryRunner.release();
    }
  }

  async updateLaundry(user: User, updateLaundryDto: UpdateLaundryDto) {
    const { queryRunner, manager } = await this.createQueryRunner();

    try {
      const foundLaundry = await this.laundriesRepository.findOneByUserId(user);

      const { address, ...laundryInfo } = updateLaundryDto;

      if (address) {
        const newAddress = updateLaundryDto.address.toAddressEntity();
        newAddress.id = foundLaundry.address.id;

        await this.addressRepository.updateOneInTransaction(
          manager,
          newAddress,
        );
      }

      if (Object.keys(laundryInfo).length !== 0) {
        foundLaundry.name = laundryInfo.name;
        foundLaundry.bizNo = laundryInfo.bizNo;
        foundLaundry.phoneNumber = laundryInfo.phoneNumber;
        await this.laundriesRepository.updateOneByEm(manager, foundLaundry);
      }

      await queryRunner.commitTransaction();

      return '수정이 완료되었습니다.';
    } catch (err) {
      await queryRunner.rollbackTransaction();
      return err;
    } finally {
      await queryRunner.release();
    }
  }

  async findLaundry(user: User) {
    const laundry = await this.laundriesRepository.findOneByUserId(user);
    return laundry ? laundry : '세탁소가 없습니다.';
  }

  async findAllLaundry() {
    return await this.laundriesRepository.findAll();
  }

  async deleteLaundry(user: User) {
    const laundry = await this.laundriesRepository.findOneByUserId(user);
    await this.laundriesRepository.deleteOne(laundry);
    return '세탁소 삭제가 완료되었습니다.';
  }
}
