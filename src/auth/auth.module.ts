import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from 'src/address/address.entity';
import { UsersRepository } from 'src/users/repository/users.repository';
import { User } from 'src/users/users.entity';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './service/auth.service';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([User, Address]),
    JwtModule.register({
      secret: process.env.JWT_SECRETKEY,
    }),
    PassportModule,
    forwardRef(() => UsersModule),
  ],
  providers: [AuthService, UsersRepository, JwtStrategy],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
