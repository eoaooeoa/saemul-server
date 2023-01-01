import { IsDateString, IsString, IsOptional, IsObject } from 'class-validator';
import { Status } from '../../common/enums/status.enum';

export class UpdateOrderDto {
  @IsString()
  @IsOptional()
  readonly status: Status;

  @IsString()
  @IsOptional()
  readonly pickUpMethod: string;

  @IsDateString()
  @IsOptional()
  readonly pickUpDateTime: Date;

  @IsObject()
  @IsOptional()
  readonly address: { roadAddr: string; detailAddr: string; jibun: string };

  @IsDateString()
  @IsOptional()
  readonly wishLaundryDateTime: Date;

  @IsString()
  @IsOptional()
  readonly notice: string;

  @IsString()
  @IsOptional()
  readonly deniedReason: string;

  @IsDateString()
  @IsOptional()
  readonly completedDateTime: Date;

  @IsDateString()
  @IsOptional()
  readonly cancelledDateTime: Date;
}
