import { Module } from '@nestjs/common';
import { AddressModule } from 'src/address/address.module';
import { laundriesModule } from 'src/laundries/laundries.module';
import { LaundriesService } from 'src/laundries/service/laundries.service';
import { UsersModule } from 'src/users/users.module';
import { PartnersController } from './controller/partners.controller';

@Module({
  imports: [laundriesModule, AddressModule, UsersModule],
  providers: [LaundriesService],
  controllers: [PartnersController],
})
export class PartnersModule {}
