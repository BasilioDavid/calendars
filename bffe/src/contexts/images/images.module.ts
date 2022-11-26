import { Module } from '@nestjs/common';

import { ImagesController } from './infraestructure/images.controller';
import { ImagesService } from './core/images.service';
import { ImagesRepository } from './core/images.repository';
import { AuthModule } from '../../shared/auth/auth.module';
import { GetCalendarImagesNameRepository } from './core/repositories/get-calendar-images-name.repository';
import { DBGetCalendarImagesNameRepositoryHandler } from './infraestructure/query-handlers/db-get-calendars-images-name.repository-handler';
import { ImageLoaderRepository } from './core/repositories/image-loader.repository';
import { HddImageLoaderRepositoryHandler } from './infraestructure/query-handlers/hdd-image-loader.repository-handler';

@Module({
  imports: [AuthModule],
  controllers: [ImagesController],
  providers: [
    ImagesService,
    ImagesRepository,
    {
      provide: GetCalendarImagesNameRepository,
      useClass: DBGetCalendarImagesNameRepositoryHandler,
    },
    {
      provide: ImageLoaderRepository,
      useClass: HddImageLoaderRepositoryHandler,
    },
  ],
})
export class ImagesModule {}
