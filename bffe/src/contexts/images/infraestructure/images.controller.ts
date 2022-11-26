import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { ImagesService } from '../core/images.service';
import { Image } from '../core/image.value-object';
import { AuthGuard } from '../../../shared/auth/auth.guard';
import { NonEmptyString } from '../../../shared/building-blocks/non-empty-string.value-object';

@Controller('images')
@UseGuards(AuthGuard)
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post('')
  @UseInterceptors(FileInterceptor('image'))
  uploadImage(
    @UploadedFile() data: Express.Multer.File,
    @Body()
    { calendarId, partNumber }: { calendarId: string; partNumber: number }
  ): void {
    this.imagesService.uploadImage(
      Image.fromPrimitives({
        buffer: data,
        mimetype: data.mimetype,
        calendarExtId: calendarId,
        partNumber: Number(partNumber),
      })
    );
  }

  @Get('all')
  getAllImages(@Query() { calendarId }: { calendarId: string }): any {
    return this.imagesService.getAll(NonEmptyString.fromPrimitives(calendarId));
  }
}
