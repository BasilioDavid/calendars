import { Response } from 'express';
import { ArgumentsHost, Injectable } from '@nestjs/common';
import { ClientError, UnknownError } from './client-error.interface';
import { LoggingService } from '../logging/logging.service';

// TODO: change this into global exception filter
@Injectable()
export class ErrorResponse {
  constructor(private readonly log: LoggingService) {}
  send(error: ClientError | Error, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();

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
