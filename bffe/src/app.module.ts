import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ImagesModule } from './contexts/images/images.module';
import { LivecheckModule } from './contexts/livecheck/livecheck.module';
import { LoginModule } from './contexts/users/login/login.module';
import { RegisterModule } from './contexts/users/register/register.module';
import { AuthModule } from './shared/auth/auth.module';
import { DatabaseModule } from './shared/database/database.module';
import { QueryContextMiddleware } from './shared/query-context/query-context.middleware';
import { QueryContextModule } from './shared/query-context/query-context.module';

@Module({
  imports: [
    LivecheckModule,
    ImagesModule,
    RegisterModule,
    LoginModule,
    DatabaseModule,
    QueryContextModule,
    AuthModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(QueryContextMiddleware).forRoutes('*');
  }
}
