import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { CarsService } from './cars.service';
import { Booking } from './dto/booking-car.dto';
import { BookingQueryCar } from './dto/booking-query-car.dto';
import { ResponseDTO } from './dto/response.dto';
import { BookingApi } from './entities/booking-api.entity';
import { CarApi } from './entities/car-api.entity';
import { CarIdApi } from './entities/car-id.entity';

@Controller('cars')
export class CarsController {
  constructor(private carsService: CarsService) {}

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 200,
    description: 'Check car available',
    type: CarIdApi,
  })
  async checkAvailable(@Param('id') id: string): Promise<ResponseDTO> {
    try {
      return { data: !(await this.carsService.checkAvailable(id)) };
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
    description: 'estimate rent period price',
    type: CarApi,
  })
  async bookingCar(@Query() query: BookingQueryCar): Promise<CarApi> {
    try {
      return {
        start_time: query.start_time,
        end_time: query.end_time,
        price: await this.carsService.rentPrice(
          query.start_time,
          query.end_time,
        ),
      };
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

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: 201,
    description: 'Booking the car',
    type: BookingApi,
  })
  async createRent(@Body() rentBody: Booking): Promise<ResponseDTO> {
    try {
      return { data: await this.carsService.createRent(rentBody) };
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
