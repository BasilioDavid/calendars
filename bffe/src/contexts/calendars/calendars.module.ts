import { Module } from '@nestjs/common';
import { AuthModule } from '../../shared/auth/auth.module';

import { UserModule } from '../../shared/user/user.module';
import { CalendarService } from './application/calendars.service';
import { CreateCalendarRepository } from './core/repositories/create-calendar.repository';
import { ImageLoaderRepository } from './core/repositories/image-loader.repository';
import { ListCalendarsRepository } from './core/repositories/list-calendars.repository';
import { CalendarController } from './infraestructure/calendar.controller';
import { DBCreateCalendarRepositoryHandler } from './infraestructure/repository-handlers/db-create-calendar.repository-handler';
import { DbListCalendarsRepositoryHandler } from './infraestructure/repository-handlers/db-list-calendars.repository-handler';
import { HddImageLoaderRepositoryHandler } from './infraestructure/repository-handlers/hdd-image-loader.repository-handler';

@Module({
  controllers: [CalendarController],
  providers: [
    CalendarService,
    {
      provide: ListCalendarsRepository,
      useClass: DbListCalendarsRepositoryHandler,
    },
    {
      provide: ImageLoaderRepository,
      useClass: HddImageLoaderRepositoryHandler,
    },
    {
      provide: CreateCalendarRepository,
      useClass: DBCreateCalendarRepositoryHandler,
    },
  ],
  imports: [UserModule, AuthModule],
})
export class CalendarModule {}
