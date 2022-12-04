import { Response } from 'express';
import { Injectable } from '@nestjs/common';
import { ClientError } from './client-error.interface';
import { LoggingService } from '../logging/logging.service';

// TODO: change this into global exception filter
@Injectable()
export class ErrorResponse {
  constructor(private readonly log: LoggingService) {}
  send(error: ClientError | Error | unknown, response: Response) {
    this.log.save('error', error);
    if (error instanceof ClientError) {
      const errorProps = error.serialize();
      response
        .status(400)
        .json({ errorCode: errorProps.code, message: errorProps.message });
    } else {
      response.status(500).json({ errorCode: 'UNKNOWN' });
    }
  }
}
