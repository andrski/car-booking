import { ApiProperty } from '@nestjs/swagger';

export class CarApi {
  @ApiProperty({ example: 1500, description: 'price rent period for car' })
  price: number;

  @ApiProperty({
    example: 1674825999,
    description: 'start rent period, timestamp',
  })
  start_time: number;

  @ApiProperty({
    example: 1674825999,
    description: 'end rent period, timestamp',
  })
  end_time: number;
}
