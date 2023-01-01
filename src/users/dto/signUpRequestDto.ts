import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Address } from 'src/address/address.entity';
import { AddressDto } from 'src/address/dto/addressDto';
import { Role } from 'src/common/enums/role.enum';
import { User } from '../users.entity';

export class SignUpRequestDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @ValidateNested()
  @Type(() => AddressDto)
  address: {
    roadAddr: 'string';
    detailAddr: 'string';
    jibun: 'string';
  };

  toUserEntity(bizType: Role) {
    return User.createEntityInstance(
      this.email,
      this.password,
      this.name,
      this.phoneNumber,
      bizType,
    );
  }

  toAddressEntity() {
    return Address.createEntityInstance(
      this.address.roadAddr,
      this.address.detailAddr,
      this.address.jibun,
    );
  }
}
