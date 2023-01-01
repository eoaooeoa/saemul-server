import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Wallet } from 'src/wallets/wallet.entity';
import { WalletsController } from './controller/wallets.controller';
import { WalletsRepository } from './repository/wallets.repository';
import { WalletsService } from './service/wallets.service';

@Module({
  imports: [TypeOrmModule.forFeature([Wallet]), AuthModule],
  providers: [WalletsRepository, WalletsService],
  controllers: [WalletsController],
  exports: [WalletsRepository],
})
export class WalletModule {}
