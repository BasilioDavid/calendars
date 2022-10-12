import { Global, Module } from '@nestjs/common';
import { ContextMiddleware } from './context.middleware';
import { ContextService } from './context.service';

@Global()
@Module({
  providers: [ContextService, ContextMiddleware],
  exports: [ContextService],
})
export class ContextModule {}
