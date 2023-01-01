import {
  Body,
  Controller,
  Get,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { AuthService } from 'src/auth/service/auth.service';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { User } from 'src/users/users.entity';
import { WalletsService } from '../service/wallets.service';

@Controller('wallets')
@UseGuards(JwtAuthGuard)
export class WalletsController {
  constructor(
    private readonly walletService: WalletsService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  async createWallet(@CurrentUser() currentUser: User) {
    return this.walletService.createWallet(currentUser);
  }

  @Get()
  async showMoney(@CurrentUser() currentUser: User) {
    return this.walletService.showMoney(currentUser);
  }

  @Post('/charge')
  async chargeMoney(
    @Body('plusMoney', ParseIntPipe) plusMoney: number,
    @CurrentUser() currentUser: User,
  ) {
    return this.walletService.chargeMoney(currentUser, plusMoney);
  }

  @Post('/payment')
  async reduceMoney(
    @Body('minusMoney', ParseIntPipe) minusMoney: number,
    @CurrentUser() currentUser: User,
  ) {
    return this.walletService.reduceMoney(currentUser, minusMoney);
  }
}
