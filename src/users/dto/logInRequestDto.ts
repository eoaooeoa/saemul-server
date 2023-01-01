import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LogInRequestDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
