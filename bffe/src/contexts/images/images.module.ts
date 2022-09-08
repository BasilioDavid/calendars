import { Module } from '@nestjs/common';
import { ImagesController } from './infraestructure/images.controller';
import { ImagesService } from './core/images.service';
import { ImagesRepository } from './core/images.repository';

@Module({
  controllers: [ImagesController],
  providers: [ImagesService, ImagesRepository],
})
export class ImagesModule {}
