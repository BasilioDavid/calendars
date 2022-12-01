import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { ErrorResponse } from '../../shared/errors/error-respones.service';

@Catch()
export class LoginExceptionFilter implements ExceptionFilter {
  constructor(private readonly error: ErrorResponse) {}
  catch(exception: any, host: ArgumentsHost) {
    this.error.send(exception, host);
  }
}
