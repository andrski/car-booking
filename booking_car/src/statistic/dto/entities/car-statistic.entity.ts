import { ApiProperty } from '@nestjs/swagger';

export class CarStatisticApi {
  @ApiProperty({ example: '1111', description: 'state car number' })
  carNumber: string;

  @ApiProperty({ example: 10, description: 'percentage rent car in a month' })
  rentPercentage: number;
}
