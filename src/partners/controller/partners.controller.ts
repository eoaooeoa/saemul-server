import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { Role } from 'src/common/enums/role.enum';
import { LaundryDto } from 'src/laundries/dto/laundryDto';
import { LaundriesService } from 'src/laundries/service/laundries.service';
import { SignUpRequestDto } from 'src/users/dto/signUpRequestDto';
import { UsersService } from 'src/users/service/users.service';
import { User } from 'src/users/users.entity';

@Controller('partners')
export class PartnersController {
  constructor(
    private readonly laundriesService: LaundriesService,
    private readonly usersService: UsersService,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getLaundry(@CurrentUser() user: User) {
    return await this.laundriesService.findLaundry(user);
  }

  @Post('signup')
  async signUp(@Body() signUpRequestDto: SignUpRequestDto) {
    return await this.usersService.createUser(
      signUpRequestDto,
      Role.BeforePartner,
    );
  }

  @Post('')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.BeforePartner)
  async createLaundry(
    @CurrentUser() user: User,
    @Body() laundryDto: LaundryDto,
  ) {
    await this.laundriesService.createLaundry(user, laundryDto);
    return await this.usersService.updateBizType(user, Role.TempPartner);
  }
}
