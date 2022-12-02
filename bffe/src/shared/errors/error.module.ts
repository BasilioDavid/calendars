import { Global, Module } from '@nestjs/common';
import { LoggingModule } from '../logging/logging.module';
import { ErrorResponse } from './error-respones.service';
import { GlobalExceptionFilter } from './global.exception-filter';

@Global()
@Module({
  providers: [ErrorResponse, GlobalExceptionFilter],
  imports: [LoggingModule],
  exports: [ErrorResponse],
})
export class ErrorModule {}
