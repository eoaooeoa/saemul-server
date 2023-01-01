import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { AddressDto } from 'src/address/dto/addressDto';
import { Laundry } from '../laundry.entity';

export class UpdateLaundryDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @IsOptional()
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
