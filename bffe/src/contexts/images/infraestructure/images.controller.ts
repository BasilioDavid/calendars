import {
  Controller,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImagesService } from '../core/images.service';
import { Request } from '@nestjs/common';
import { Image } from '../core/image.value-object';
import { UUID } from 'src/shared/building-blocks/uuid.value-object';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post('')
  @UseInterceptors(FileInterceptor('photos'))
  uploadImage(
    @Req() expressRequest: Request,
    @UploadedFile() data: Express.Multer.File,
  ): void {
    this.imagesService.uploadImage(
      new Image({
        buffer: data,
        id: new UUID(),
        name: new UUID(),
      }),
    );
  }
}
