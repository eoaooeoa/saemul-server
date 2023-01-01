import { IsNotEmpty, IsString } from 'class-validator';
import { Address } from '../address.entity';

export class AddressDto {
  @IsString()
  @IsNotEmpty()
  roadAddr: string;

  @IsString()
  @IsNotEmpty()
  detailAddr: string;

  @IsString()
  @IsNotEmpty()
  jibun: string;

  toAddressEntity() {
    return Address.createEntityInstance(
      this.roadAddr,
      this.detailAddr,
      this.jibun,
    );
  }
}
