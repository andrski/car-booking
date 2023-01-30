import { ApiProperty } from '@nestjs/swagger';

export class BookingQueryCar {
  @ApiProperty({ example: 1674825475, description: 'start period, timestamp' })
  start_time: number;

  @ApiProperty({ example: 1674825999, description: 'end period, timestamp' })
  end_time: number;
}
