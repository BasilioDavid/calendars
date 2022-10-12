import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ContextService } from './context.service';

@Injectable()
export class ContextMiddleware implements NestMiddleware {
  constructor(private readonly context: ContextService) {}

  use(req: Request, res: Response, next: NextFunction) {
    this.context.run(next);
  }
}
