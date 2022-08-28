import { Injectable } from '@nestjs/common';
import { writeFile } from 'fs/promises';
import { Image } from './image.value-object';
import { ImagesRepository } from './images.repository';

@Injectable()
export class ImagesService {
  constructor(private readonly imagesRepository: ImagesRepository) {}

  async uploadImage(image: Image) {
    const imageProps = image.toPrimitives();

    await writeFile(
      //TODO: change this route
      __dirname + '/../../../../../images/' + imageProps.name,
      imageProps.buffer.buffer,
    );

    await this.imagesRepository.insertImage(imageProps.name);
  }
}
