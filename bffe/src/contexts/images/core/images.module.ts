import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { ImagesController } from '../infraestructure/images.controller';
import { ImagesService } from './images.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ImagesController],
  providers: [ImagesService],
})
export class ImagesModule {}
