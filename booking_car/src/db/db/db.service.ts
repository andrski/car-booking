import { Inject, Injectable } from '@nestjs/common';
import { Booking } from 'src/cars/dto/booking-car.dto';
import { Car } from 'src/cars/dto/car.dto';
import { TableName } from 'src/cars/dto/entities/table-name.model';
import { Prices } from 'src/cars/dto/prices.dto';
import { queries } from '../db-queries';

@Injectable()
export class DbService {
  constructor(@Inject('DATABASE_POOL') private conn: any) {
    this.createIfNotExistTables();
  }

  async createIfNotExistTables(): Promise<void> {
    // await this.conn.query(`drop table booking;`);
    // await this.conn.query(`drop table cars;`);
    await this.conn.query(queries.create.cars);
    await this.conn.query(queries.create.booking);
    await this.conn.query(queries.create.prices);
    const insertCondCars = !!(await (await this.geTAll('cars')).length);
    if (!insertCondCars) await this.conn.query(queries.insert.cars);
    const insertCondPrices = !!(await (await this.geTAll('prices')).length);
    if (!insertCondPrices) await this.conn.query(queries.insert.prices);
  }

  async getBookingByCarId(id: string): Promise<Booking[]> {
    return (await this.conn.query(`${queries.bookingsByCarId} ${id}`)).rows;
  }

  async getBookingByCarIdCurrentMonth(
    id: string,
    startTime: string,
    endTime: string,
  ): Promise<Array<Booking & Car>> {
    const queryStr = `${queries.bookingsByCarId} ${id} and date_value BETWEEN '${startTime}' AND '${endTime}'`;

    return (await this.conn.query(queryStr)).rows;
  }

  async geTAll(tableName: TableName): Promise<Car[] | Booking[] | Prices[]> {
    return (await this.conn.query(queries.selectFrom + ` ${tableName}`)).rows;
  }

  async createRent(rentBody: Booking): Promise<Booking> {
    console.log(new Date().toISOString().split('T')[0]);
    return (
      await this.conn.query(`${
        queries.insert.booking
      } (start_time, end_time, price, date_value, car_id)
    VALUES(${rentBody.start_time},
        ${rentBody.end_time},
        ${rentBody.price},
        to_timestamp(${Date.now()} / 1000.0),
        ${rentBody.car_id})
    RETURNING *;`)
    ).rows;
  }
}
