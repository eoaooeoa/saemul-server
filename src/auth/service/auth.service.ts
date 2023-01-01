import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LogInRequestDto } from 'src/users/dto/logInRequestDto';
import { UsersRepository } from 'src/users/repository/users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/users.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async jwtLogIn(data: LogInRequestDto) {
    const { email, password } = data;

    const user = await this.usersRepository.findOneByEmail(email);

    if (!user)
      throw new UnauthorizedException(
        '이메일 또는 비밀번호가 일치하지 않습니다.',
      );

    await this.comparePassword(password, user.password);

    const payload = { userEmail: user.email, userId: user.id };

    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  async validateUser(userEmail) {
    const user = await this.usersRepository.findOneByEmail(userEmail);

    return user;
  }

  compareUserId(paramId: string, currentUser: User) {
    const { id } = currentUser;
    if (paramId !== id)
      throw new UnauthorizedException('다른 유저의 정보에 접근했습니다.');
    return;
  }

  private async comparePassword(passowrdFromClient, passwordFromDb) {
    const isMatch = await bcrypt.compare(passowrdFromClient, passwordFromDb);

    if (!isMatch)
      throw new UnauthorizedException(
        '아이디 또는 비밀번호가 일치하지 않습니다.',
      );

    return;
  }
}
