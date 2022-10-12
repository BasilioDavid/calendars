import { Module } from '@nestjs/common';
import { AuthModule } from '../../shared/auth/auth.module';

import { UserModule } from '../../shared/user/user.module';
import { CalendarRepository } from './core/calendar.repository';
import { CalendarService } from './core/calendars.service';
import { CalendarController } from './infraestructure/calendar.controller';

@Module({
  controllers: [CalendarController],
  providers: [CalendarService, CalendarRepository],
  imports: [UserModule, AuthModule],
})
export class CalendarModule {}
