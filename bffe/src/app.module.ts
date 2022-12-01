import { MiddlewareConsumer, Module } from '@nestjs/common';
import { CalendarModule } from './contexts/calendars/calendars.module';
import { ImagesModule } from './contexts/images/images.module';
import { LivecheckModule } from './contexts/livecheck/livecheck.module';
import { LoginModule } from './contexts/users/login/login.module';
import { RegisterModule } from './contexts/users/register/register.module';
import { AuthModule } from './shared/auth/auth.module';
import { DatabaseModule } from './shared/database/database.module';
import { ContextMiddleware } from './shared/context/context.middleware';
import { ContextModule } from './shared/context/context.module';
import { GenerateCalendarModule } from './contexts/generate-calendar/images.module';

@Module({
  imports: [
    LivecheckModule,
    ImagesModule,
    RegisterModule,
    LoginModule,
    DatabaseModule,
    ContextModule,
    AuthModule,
    CalendarModule,
    GenerateCalendarModule,
  ],
})
export class AppModule {}
