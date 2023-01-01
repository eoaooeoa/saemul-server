import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './address.entity';
import { AddressRepository } from './repository/address.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Address])],
  providers: [AddressRepository],
  exports: [AddressRepository],
})
export class AddressModule {}
