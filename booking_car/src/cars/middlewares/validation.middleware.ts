import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { isEqual } from 'lodash';

@Injectable()
export class ValidationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (
      ('start_time' in req.body && 'end_time' in req.body) ||
      ('start_time' in req.query && 'end_time' in req.query)
    ) {
      const startTime = req.body.start_time
        ? new Date(req.body.start_time * 1000)
        : new Date(Number(req.query.start_time) * 1000);

      const endTime = req.body.end_time
        ? new Date(req.body.end_time * 1000)
        : new Date(Number(req.query.end_time) * 1000);

      if (startTime > endTime)
        throw new BadRequestException(
          'end_time have to be more then start time',
        );
      if (
        isEqual(startTime.getDay(), 6) ||
        isEqual(startTime.getDay(), 7) ||
        isEqual(endTime.getDay(), 6) ||
        isEqual(endTime.getDay(), 7)
      )
        throw new BadRequestException(
          'you should start or end rent period in working days only',
        );
      if (endTime.getTime() - startTime.getTime() <= 259200 * 1000)
        throw new BadRequestException('minimal rent period is 3 days');
      if (endTime.getTime() - startTime.getTime() > 2592000 * 1000)
        throw new BadRequestException('rent period must be less than 30 days');
    }
    next();
  }
}
