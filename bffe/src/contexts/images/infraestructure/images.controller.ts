import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { ImagesService } from '../core/images.service';
import { Image } from '../core/image.value-object';
import { AuthGuard } from '../../../shared/auth/auth.guard';

@Controller('images')
@UseGuards(AuthGuard)
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post('')
  @UseInterceptors(FileInterceptor('photos'))
  uploadImage(@UploadedFile() data: Express.Multer.File): void {
    this.imagesService.uploadImage(
      Image.fromPrimitives({
        buffer: data,
        mimetype: data.mimetype,
      })
    );
  }
}
