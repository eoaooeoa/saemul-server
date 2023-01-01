import { AddressDto } from 'src/address/dto/addressDto';
import { User } from '../users.entity';

export class UserResponseDto {
  email: string;

  name: string;

  phoneNumber: string;

  address: object;

  money: number;

  bizType: string;

  static EntityToDto(user: User) {
    const { roadAddr, detailAddr, jibun } = user.address;
    const resDto = new UserResponseDto();
    resDto.name = user.name;
    resDto.email = user.email;
    resDto.address = { roadAddr, detailAddr, jibun };
    resDto.phoneNumber = user.phoneNumber;
    resDto.money = user?.wallet?.money ?? 0;
    resDto.bizType = user.bizType;
    return resDto;
  }
}
