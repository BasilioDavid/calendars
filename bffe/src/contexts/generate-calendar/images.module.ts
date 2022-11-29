import { Module } from '@nestjs/common';

import { AuthModule } from '../../shared/auth/auth.module';
import { GenerateCalendarService } from './application/generate-calendar.service';
import { GetCalendarImagesNameRepository } from './core/repositories/get-calendar-images-name.repository';
import { ImageLoaderRepository } from './core/repositories/image-loader.repository';
import { CalendarController } from './infraestructure/calendar.controller';
import { DBGetCalendarImagesNameRepositoryHandler } from './infraestructure/repository-handlers/db-get-calendars-images-name.repository-handler';
import { HddImageLoaderRepositoryHandler } from './infraestructure/repository-handlers/hdd-image-loader.repository-handler';

@Module({
  imports: [AuthModule],
  controllers: [CalendarController],
  providers: [
    {
      provide: GetCalendarImagesNameRepository,
      useClass: DBGetCalendarImagesNameRepositoryHandler,
    },
    {
      provide: ImageLoaderRepository,
      useClass: HddImageLoaderRepositoryHandler,
    },
    GenerateCalendarService,
  ],
})
export class GenerateCalendarModule {}
