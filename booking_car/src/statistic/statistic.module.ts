import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { StatisticController } from './statistic.controller';
import { StatisticService } from './statistic.service';

@Module({
  imports: [DbModule],
  controllers: [StatisticController],
  providers: [StatisticService],
})
export class StatisticModule {}
