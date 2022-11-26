import { Injectable } from '@nestjs/common';
import { writeFile } from 'fs/promises';

import { NonEmptyString } from '../../../shared/building-blocks/non-empty-string.value-object';
import { UTIL_FOLDER } from '../../../shared/consts';
import { UserService } from '../../../shared/user/user.service';
import { Image } from '../core/value-objects/image.value-object';
import { GetCalendarImagesNameRepository } from '../core/repositories/get-calendar-images-name.repository';
import { ImageLoaderRepository } from '../core/repositories/image-loader.repository';
import { GetCalendarNameRepository } from '../core/repositories/get-calendar-name.repository';
import { UploadImagesRepository } from '../core/repositories/upload-images.repository';

@Injectable()
export class ImagesService {
  constructor(
    private readonly uploadImageRepository: UploadImagesRepository,
    private readonly userService: UserService,
    private readonly getCalendarsImagesName: GetCalendarImagesNameRepository,
    private readonly getCalendarName: GetCalendarNameRepository,
    private readonly imageLoader: ImageLoaderRepository
  ) {}

  async uploadImage(image: Image) {
    const imageProps = image.toPrimitives();

    await writeFile(
      UTIL_FOLDER.IMAGES + '/' + imageProps.name,
      imageProps.buffer.buffer
    );

    await this.uploadImageRepository.handle({
      fileName: imageProps.name,
      calendarExtId: imageProps.calendarExtId,
      partNumber: imageProps.partNumber,
      userId: this.userService.get().id,
    });
  }

  async getAll(calendarExtId: NonEmptyString) {
    const calendarImages = await this.getCalendarsImagesName.handle({
      calendarExtId: calendarExtId.toPrimitives(),
      userId: this.userService.get().id,
    });
    const imagesGenerated: {
      [monthNumber: number]: { thumbnail: any; normal: any };
    } = {};

    for (const { calendarMonthNumber, fileName } of calendarImages) {
      const src = await this.imageLoader.handle({ imageName: fileName });
      // TODO: make a reduce version to thumbnail
      imagesGenerated[calendarMonthNumber] = {
        // TODO: move this into output VO
        thumbnail: 'data:image/png;base64, ' + src.image.toString('base64'),
        normal: 'data:image/png;base64, ' + src.image.toString('base64'),
      };
    }
    return imagesGenerated;
  }

  getName(calendarExtId: NonEmptyString) {
    return this.getCalendarName.handle({
      calendarExtId: calendarExtId.toPrimitives(),
      userId: this.userService.get().id,
    });
  }
}
