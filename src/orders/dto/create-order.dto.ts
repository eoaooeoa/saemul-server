import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsString,
  IsOptional,
  IsObject,
} from 'class-validator';
import { Status } from '../../common/enums/status.enum';

export class CreateOrderDto {
  @IsString()
  @ApiProperty({
    name: 'status',
    enum: Status,
  })
  readonly status: Status;

  @IsString()
  @ApiProperty()
  readonly pickUpMethod: string;

  @IsDateString()
  @ApiProperty()
  readonly pickUpDateTime: Date;

  @IsObject()
  @ApiProperty()
  readonly address: { roadAddr: string; detailAddr: string; jibun: string };

  @IsDateString()
  @IsOptional()
  @ApiProperty()
  readonly wishLaundryDateTime: Date;

  @IsString()
  @IsOptional()
  @ApiProperty()
  readonly notice: string;

  @IsArray()
  @ApiProperty()
  readonly products: string[];

  @IsString()
  @ApiProperty()
  readonly laundryId: string;

  @IsArray()
  @IsOptional()
  @ApiProperty()
  readonly images: string[];
}
