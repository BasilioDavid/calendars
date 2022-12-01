import { Global, Module } from '@nestjs/common';
import { LoggingModule } from '../logging/logging.module';
import { ErrorResponse } from './error-respones.service';

@Global()
@Module({
  providers: [ErrorResponse],
  imports: [LoggingModule],
  exports: [ErrorResponse],
})
export class ErrorModule {}
