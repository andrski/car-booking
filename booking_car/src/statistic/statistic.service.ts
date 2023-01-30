import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db/db.service';
import { CarStatistic } from './dto/car-statistic.dto';
import { isEqual } from 'lodash';
import { Booking } from 'src/cars/dto/booking-car.dto';
import { Car } from 'src/cars/dto/car.dto';

@Injectable()
export class StatisticService {
  constructor(private dbService: DbService) {}

  countDaysInMonth(): number {
    return new Date(
      new Date().getFullYear(),
      new Date().getMonth() + 1,
      0,
    ).getDate();
  }

  calculatePercentage(start_time: number, end_time: number): number {
    const start = new Date(start_time * 1000).toISOString().slice(8, 10);
    const end = new Date(end_time * 1000).toISOString().slice(8, 10);
    if (
      isEqual(new Date().getMonth(), new Date(start_time * 1000).getMonth()) &&
      isEqual(new Date().getMonth(), new Date(end_time * 1000).getMonth())
    )
      return Number(end) - Number(start);
    else return 0;
  }

  async singleCarPercentage(id: string): Promise<CarStatistic> {
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 2);
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    const carBookingsMonth: Array<Booking & Car> =
      await this.dbService.getBookingByCarIdCurrentMonth(
        id,
        firstDay.toISOString().slice(0, 10),
        lastDay.toISOString().slice(0, 10),
      );

    const resultRentCarInMonth = carBookingsMonth
      .map((item) => {
        return this.calculatePercentage(item.start_time, item.end_time);
      })
      .reduce((prev: number, item: number) => {
        return (prev += item);
      }, 0);

    return {
      carNumber: carBookingsMonth[0]?.car_number
        ? carBookingsMonth[0].car_number
        : null,
      rentPercentage: Math.round(
        (resultRentCarInMonth / this.countDaysInMonth()) * 100,
      ),
    };
  }

  async percentage(id?: string): Promise<CarStatistic[]> {
    if (id) {
      return [await this.singleCarPercentage(id)];
    } else {
      const cars: Car[] = (await this.dbService.geTAll('cars')) as Car[];
      const resultPromises = cars.map(
        async (item: Car) => await this.singleCarPercentage(item.id.toString()),
      );

      return await Promise.all([...resultPromises]);
    }
  }
}
