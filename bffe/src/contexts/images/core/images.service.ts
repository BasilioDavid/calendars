import { Injectable } from '@nestjs/common';
import { writeFile } from 'fs/promises';
import { COMMON_FOLDER } from '../../../shared/consts';
import { Image } from './image.value-object';
import { ImagesRepository } from './images.repository';

@Injectable()
export class ImagesService {
  constructor(private readonly imagesRepository: ImagesRepository) {}

  async uploadImage(image: Image) {
    const imageProps = image.toPrimitives();

    await writeFile(
      COMMON_FOLDER + '/images/' + imageProps.name,
      imageProps.buffer.buffer
    );

    await this.imagesRepository.insertImage({
      fileName: imageProps.name,
      calendarExtId: imageProps.calendarExtId,
    });
  }
}
