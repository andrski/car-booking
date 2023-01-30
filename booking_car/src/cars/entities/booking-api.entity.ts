import { ApiProperty } from '@nestjs/swagger';

export class BookingApi {
  id?: number;

  @ApiProperty({ example: 1674825475, description: 'timestamp' })
  start_time: number;

  @ApiProperty({ example: 1674825475, description: 'timestamp' })
  end_time: number;

  price?: number;

  @ApiProperty({ example: 1, description: 'id car ro rent' })
  car_id: number;
}
