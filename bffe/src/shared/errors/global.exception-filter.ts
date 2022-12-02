import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { ErrorResponse } from './error-respones.service';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(private readonly error: ErrorResponse) {}
  catch(exception: any, host: ArgumentsHost) {
    this.error.send(exception, host);
  }
}
