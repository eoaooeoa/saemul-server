import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressModule } from 'src/address/address.module';
import { LaundriesController } from './controller/laundries.controller';
import { Laundry } from './laundry.entity';
import { LaundriesRepository } from './repository/laundries.repository';
import { LaundriesService } from './service/laundries.service';

@Module({
  imports: [TypeOrmModule.forFeature([Laundry]), AddressModule],
  controllers: [LaundriesController],
  providers: [LaundriesService, LaundriesRepository],
  exports: [LaundriesRepository],
})
export class laundriesModule {}
