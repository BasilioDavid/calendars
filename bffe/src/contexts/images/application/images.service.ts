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
import { MinifierToSaveImageDecorator } from '../core/image-decorators/minifier-to-save.image-decorator';
import { MinifierToThumbnailImageDecorator } from '../core/image-decorators/minifier-to-thumbnail.image-decorator';
import { MinifierToNormalImageDecorator } from '../core/image-decorators/minifier-to-normal.image-decorator';
import { ImageWritterImagesRepository } from '../core/repositories/image-writter.repository';

@Injectable()
export class ImagesService {
  constructor(
    private readonly uploadImageRepository: UploadImagesRepository,
    private readonly userService: UserService,
    private readonly getCalendarsImagesName: GetCalendarImagesNameRepository,
    private readonly getCalendarName: GetCalendarNameRepository,
    private readonly imageLoader: ImageLoaderRepository,
    private readonly imageWritter: ImageWritterImagesRepository
  ) {}

  async uploadImage(image: Image) {
    const imageProps = image.toPrimitives();

    const processedImgPromise = new MinifierToSaveImageDecorator().decorate(
      imageProps.buffer.buffer
    );
    const imageNormalPromise =
      await new MinifierToNormalImageDecorator().decorate(
        imageProps.buffer.buffer
      );
    const imageThumbnailPromise =
      await new MinifierToThumbnailImageDecorator().decorate(
        imageProps.buffer.buffer
      );

    const [processedImg, imageNormal, imageThumbnail] = await Promise.all([
      processedImgPromise,
      imageNormalPromise,
      imageThumbnailPromise,
    ]);

    await this.imageWritter.handle({
      fileName: imageProps.name,
      file: processedImg,
    });

    await this.uploadImageRepository.handle({
      fileName: imageProps.name,
      calendarExtId: imageProps.calendarExtId,
      partNumber: imageProps.partNumber,
      userId: this.userService.get().id,
    });

    // TODO: move this into output VO
    return {
      thumbnail: 'data:image/png;base64, ' + imageThumbnail.toString('base64'),
      normal: 'data:image/png;base64, ' + imageNormal.toString('base64'),
    };
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
      const imageNormalPromise =
        await new MinifierToNormalImageDecorator().decorate(src.image);
      const imageThumbnailPromise =
        await new MinifierToThumbnailImageDecorator().decorate(src.image);

      const [imageNormal, imageThumbnail] = await Promise.all([
        imageNormalPromise,
        imageThumbnailPromise,
      ]);

      imagesGenerated[calendarMonthNumber] = {
        // TODO: move this into output VO
        thumbnail:
          'data:image/png;base64, ' + imageThumbnail.toString('base64'),
        normal: 'data:image/png;base64, ' + imageNormal.toString('base64'),
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
