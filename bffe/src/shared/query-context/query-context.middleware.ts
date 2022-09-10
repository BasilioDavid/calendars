import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { QueryContextService } from './query-context.service';

@Injectable()
export class QueryContextMiddleware implements NestMiddleware {
  constructor(private readonly context: QueryContextService) {}

  use(req: Request, res: Response, next: NextFunction) {
    this.context.run(next);
  }
}
