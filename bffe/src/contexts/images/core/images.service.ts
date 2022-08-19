import { Injectable } from '@nestjs/common';
import { writeFile } from 'fs/promises';
import { Image } from './image.value-object';

@Injectable()
export class ImagesService {
  async uploadImage(image: Image) {
    const imageProps = image.toPrimitives();

    await writeFile(
      //TODO: change this route
      __dirname + '/../../../../../images/' + imageProps.name,
      imageProps.buffer.buffer,
    );
  }
}
