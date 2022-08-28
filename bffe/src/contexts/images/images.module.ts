import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { ImagesController } from './infraestructure/images.controller';
import { ImagesService } from './core/images.service';
import { ImagesRepository } from './core/images.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [ImagesController],
  providers: [ImagesService, ImagesRepository],
})
export class ImagesModule {}
