import { Global, Module } from '@nestjs/common';
import { QueryContextMiddleware } from './query-context.middleware';
import { QueryContextService } from './query-context.service';

//TODO: check global
@Global()
@Module({
  providers: [QueryContextService, QueryContextMiddleware],
  exports: [QueryContextService],
})
export class QueryContextModule {}
