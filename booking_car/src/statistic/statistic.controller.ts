import {
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { ResponseDTO } from 'src/cars/dto/response.dto';
import { CarStatisticApi } from './dto/entities/car-statistic.entity';
import { StatisticService } from './statistic.service';

@Controller('statistic')
export class StatisticController {
  constructor(private statService: StatisticService) {}

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 200,
    description: 'Check car available',
    type: CarStatisticApi,
  })
  async singleStat(@Param('id') id: string): Promise<ResponseDTO> {
    try {
      return { data: await this.statService.percentage(id) };
    } catch (error: any) {
      throw new HttpException(
        `Internal Server ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: new Error(),
        },
      );
    }
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 200,
    description: 'Check car available',
    type: CarStatisticApi,
  })
  async multipleStat(): Promise<ResponseDTO> {
    try {
      return { data: await this.statService.percentage() };
    } catch (error: any) {
      throw new HttpException(
        `Internal Server ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: new Error(),
        },
      );
    }
  }
}
