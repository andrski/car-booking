import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db/db.service';
import { Booking } from './dto/booking-car.dto';
import { Prices } from './dto/prices.dto';
import { DayPrice } from './dto/helper-entities/day-price.model';
import { isEqual, inRange } from 'lodash';

@Injectable()
export class CarsService {
  constructor(private dbService: DbService) {}

  async checkAvailable(id: string): Promise<boolean> {
    const resp = await this.dbService.getBookingByCarId(id);

    return !!resp.find((item: Booking) =>
      inRange(
        new Date().getTime(),
        item.start_time * 1000,
        item.end_time * 1000,
      ),
    );
  }

  async createRent(rentBody: Booking): Promise<Booking> {
    rentBody.price = await this.rentPrice(
      rentBody.start_time,
      rentBody.end_time,
    );

    return await this.dbService.createRent(rentBody);
  }

  async rentPrice(startTime: number, endTime: number): Promise<number> {
    const prices: Prices[] = (await this.dbService.geTAll(
      'prices',
    )) as Prices[];

    // find rent period
    const period: number = Math.ceil((endTime - startTime) / 86400);
    // fill array all period days
    const daysArray: number[] = [];
    for (let i = 0; i < period; i++) daysArray.push(i + 1);

    const pricesDataArray = Object.entries(prices[0]);
    const basePrice: number = pricesDataArray.find((item: any[]) =>
      isEqual(item[0], 'base'),
    )[1];
    let curSale = 0;

    // create array with sale for every day
    const daysPrices: DayPrice[] = daysArray.reduce(
      (prev: DayPrice[], itemDay: number) => {
        // find in items from DB sale values for every day
        // in this case, we need to name the columns in the table in a special way
        const currentPriceData = pricesDataArray.find((item: any[]) =>
          item[0].includes(`_${itemDay - 1}_`),
        );
        // if current sale exist update variable curSale, if no leave the previous value
        if (currentPriceData) curSale = currentPriceData[1];

        prev.push({
          days: itemDay,
          sale: curSale,
        });

        return prev;
      },
      [],
    );
    // loop by array and get summa price with sales;
    return daysPrices.reduce((prev: number, itemDay: DayPrice) => {
      prev =
        prev +
        (itemDay.sale
          ? basePrice - basePrice * itemDay.sale * 0.01
          : basePrice);

      return prev;
    }, 0);
  }
}
