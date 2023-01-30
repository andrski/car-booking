import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class Booking {
  @IsNumber()
  @IsOptional()
  id?: number;

  @ApiProperty({
    example: 1674825999,
    description: 'start booking period, timestamp',
  })
  @IsNumber()
  start_time: number;

  @ApiProperty({
    example: 1674825999,
    description: 'end booking period, timestamp',
  })
  @IsNumber()
  end_time: number;

  price?: number;

  @ApiProperty({
    example: 1,
    description: 'car id for booking',
  })
  @IsNumber()
  car_id: number;
}
