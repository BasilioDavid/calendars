import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggingService } from './logging.service';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  constructor(private readonly log: LoggingService<Record<string, any>>) {}

  use(req: Request, res: Response, next: NextFunction) {
    this.log.save('body', req.body);
    this.log.save('url', req.url);
    this.log.save('method', req.method);
    this.log.save('host', req.headers.host);
    this.log.save('query', req.query);
    this.log.save('headers', req.headers);

    const send = res.send;

    res.send = (body: string | undefined) => {
      this.log.save('status', res.statusCode);
      return send.call(res, body);
    };

    const logResponse = () => {
      res.removeListener('finish', logResponse);
      res.removeListener('close', logResponse);
      this.log.writeAll();
    };

    res.on('finish', logResponse);
    res.on('close', logResponse);
    next();
  }
}
