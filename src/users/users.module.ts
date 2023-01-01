import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from 'src/address/address.entity';
import { AddressModule } from 'src/address/address.module';
import { AddressRepository } from 'src/address/repository/address.repository';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/service/auth.service';
import { WalletModule } from 'src/wallets/wallets.module';
import { UsersController } from './controller/users.controller';
import { UsersRepository } from './repository/users.repository';
import { UsersService } from './service/users.service';
import { User } from './users.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([User, Address]),
    forwardRef(() => AuthModule),
    AddressModule,
    WalletModule,
  ],
  providers: [UsersService, UsersRepository, AddressRepository, AuthService],
  controllers: [UsersController],
  exports: [UsersRepository, UsersService],
})
export class UsersModule {}
