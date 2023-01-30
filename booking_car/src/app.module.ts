import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarsController } from './cars/cars.controller';
import { CarsService } from './cars/cars.service';
import { ValidationMiddleware } from './cars/middlewares/validation.middleware';
import { DbModule } from './db/db.module';
import { StatisticModule } from './statistic/statistic.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    DbModule,
    StatisticModule,
  ],
  controllers: [AppController, CarsController],
  providers: [AppService, CarsService],
  exports: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ValidationMiddleware).forRoutes('cars');
  }
}
