import { Module } from '@nestjs/common';
import { CalendarModule } from './contexts/calendars/calendars.module';
import { ImagesModule } from './contexts/images/images.module';
import { LivecheckModule } from './contexts/livecheck/livecheck.module';
import { LoginModule } from './contexts/login/login.module';
import { RegisterModule } from './contexts/register/register.module';
import { AuthModule } from './shared/auth/auth.module';
import { DatabaseModule } from './shared/database/database.module';
import { ContextModule } from './shared/context/context.module';
import { GenerateCalendarModule } from './contexts/generate-calendar/images.module';
import { LoggingModule } from './shared/logging/logging.module';
import { ErrorModule } from './shared/errors/error.module';
import { OrderModule } from './contexts/order/order.module';

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
    LoggingModule,
    ErrorModule,
  ],
})
export class AppModule {}
