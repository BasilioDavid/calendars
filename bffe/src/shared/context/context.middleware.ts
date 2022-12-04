import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ErrorResponse } from '../errors/error-respones.service';
import { ContextService } from './context.service';

@Injectable()
export class ContextMiddleware implements NestMiddleware {
  constructor(
    private readonly context: ContextService,
    private readonly errors: ErrorResponse
  ) {}

  use(req: Request, res: Response, next: NextFunction) {
    try {
      this.context.run(next);
    } catch (e) {
      this.errors.send(e, res);
    }
  }
}
