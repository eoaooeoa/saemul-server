import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { AddressDto } from 'src/address/dto/addressDto';
import { Laundry } from '../laundry.entity';

export class LaundryDto {
  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  bizNo: string;

  toLaundryEntity() {
    return Laundry.createEntityInstance(
      this.name,
      this.phoneNumber,
      this.bizNo,
      false,
    );
  }
}
