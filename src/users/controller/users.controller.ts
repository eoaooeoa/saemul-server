import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { AuthService } from 'src/auth/service/auth.service';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { Role } from 'src/common/enums/role.enum';
import { ChangeUserInfoRequestDto } from '../dto/changeUserInfoRequestDto';
import { LogInRequestDto } from '../dto/logInRequestDto';
import { SignUpRequestDto } from '../dto/signUpRequestDto';
import { UsersService } from '../service/users.service';
import { User } from '../users.entity';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('signup')
  async signUp(@Body() signUpRequestDto: SignUpRequestDto) {
    return this.usersService.createUser(signUpRequestDto, Role.User);
  }

  @Post('login')
  @HttpCode(200)
  async logIn(@Body() logInRequestDto: LogInRequestDto) {
    return this.authService.jwtLogIn(logInRequestDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getUserInfo(@CurrentUser() currentUser: User) {
    return this.usersService.findOneUser(currentUser);
  }

  @Get('orders')
  @UseGuards(JwtAuthGuard)
  async getOrderHistory(@CurrentUser() currentUser: User) {
    return '주문 기록 가져오기';
  }

  @Put('password')
  @UseGuards(JwtAuthGuard)
  async changePassword(
    @CurrentUser() currentUser: User,
    @Body('password') password: string,
  ) {
    return this.usersService.updateUserPassword(currentUser, password);
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  async changeUserInfo(
    @CurrentUser() currentUser: User,
    @Body() newUserInfo: ChangeUserInfoRequestDto,
  ) {
    return this.usersService.updateUserInfo(currentUser, newUserInfo);
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  async deleteOne(@CurrentUser() currentUser: User) {
    return this.usersService.deleteUser(currentUser);
  }
}
