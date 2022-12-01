import { Module } from '@nestjs/common';
import { ConsoleLoggingService } from './console-logging.service';
import { LoggingMiddleware } from './logging.middleware';
import { LoggingService } from './logging.service';

@Module({
  providers: [
    { provide: LoggingService, useClass: ConsoleLoggingService },
    LoggingMiddleware,
  ],
  exports: [LoggingService],
})
export class LoggingModule {}
