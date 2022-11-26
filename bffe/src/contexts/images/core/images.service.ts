import { Injectable } from '@nestjs/common';
import { writeFile } from 'fs/promises';
import { NonEmptyString } from '../../../shared/building-blocks/non-empty-string.value-object';
import { COMMON_FOLDER } from '../../../shared/consts';
import { UserService } from '../../../shared/user/user.service';
import { Image } from './image.value-object';
import { ImagesRepository } from './images.repository';
import { GetCalendarImagesNameRepository } from './repositories/get-calendar-images-name.repository';
import { ImageLoaderRepository } from './repositories/image-loader.repository';
import { Blob } from 'buffer';

@Injectable()
export class ImagesService {
  constructor(
    private readonly imagesRepository: ImagesRepository,
    private readonly userService: UserService,
    private readonly getCalendarsImagesName: GetCalendarImagesNameRepository,
    private readonly imageLoader: ImageLoaderRepository
  ) {}

  async uploadImage(image: Image) {
    const imageProps = image.toPrimitives();

    await writeFile(
      COMMON_FOLDER + '/images/' + imageProps.name,
      imageProps.buffer.buffer
    );

    await this.imagesRepository.insertImage({
      fileName: imageProps.name,
      calendarExtId: imageProps.calendarExtId,
      partNumber: imageProps.partNumber,
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
        thumbnail: 'data:image/png;base64, ' + src.image.toString('base64'),
        normal: 'data:image/png;base64, ' + src.image.toString('base64'),
      };
    }
    return imagesGenerated;
  }
}
