import { Module } from '@nestjs/common';

import { ImagesController } from './infraestructure/images.controller';
import { ImagesService } from './application/images.service';
import { DBGetCalendarNameRepositoryHandler } from './infraestructure/repository-handlers/db-get-calendar-name.repository-handler';
import { AuthModule } from '../../shared/auth/auth.module';
import { GetCalendarImagesNameRepository } from './core/repositories/get-calendar-images-name.repository';
import { DBGetCalendarImagesNameRepositoryHandler } from './infraestructure/repository-handlers/db-get-calendars-images-name.repository-handler';
import { ImageLoaderRepository } from './core/repositories/image-loader.repository';
import { HddImageLoaderRepositoryHandler } from './infraestructure/repository-handlers/hdd-image-loader.repository-handler';
import { GetCalendarNameRepository } from './core/repositories/get-calendar-name.repository';
import { UploadImagesRepository } from './core/repositories/upload-images.repository';
import { DBUploadImagesRepositoryHandler } from './infraestructure/repository-handlers/db-upload-images.repository-handler';

@Module({
  imports: [AuthModule],
  controllers: [ImagesController],
  providers: [
    ImagesService,
    {
      provide: UploadImagesRepository,
      useClass: DBUploadImagesRepositoryHandler,
    },
    {
      provide: GetCalendarNameRepository,
      useClass: DBGetCalendarNameRepositoryHandler,
    },
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
