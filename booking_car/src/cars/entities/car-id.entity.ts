import { ApiProperty } from '@nestjs/swagger';

export class CarIdApi {
  @ApiProperty({ example: true, description: 'car id for checking available' })
  data: boolean;
}
