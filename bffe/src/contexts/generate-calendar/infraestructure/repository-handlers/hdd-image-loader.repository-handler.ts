import { Injectable } from '@nestjs/common';
import { readFile } from 'fs/promises';
import { UTIL_FOLDER } from '../../../../shared/consts';
import {
  GetInputFromRepository,
  GetOutputFromRepository,
} from '../../../../shared/utils/get-from-repository';
import { ImageLoaderRepository } from '../../core/repositories/image-loader.repository';

@Injectable()
export class HddImageLoaderRepositoryHandler extends ImageLoaderRepository {
  constructor() {
    super();
  }
  async handle({
    imageName,
    templateName,
  }: GetInputFromRepository<ImageLoaderRepository>): GetOutputFromRepository<ImageLoaderRepository> {
    const templatePromise = readFile(
      `${UTIL_FOLDER.TEMPLATES}/${templateName}`
    );
    const imagePromise = readFile(`${UTIL_FOLDER.IMAGES}/${imageName}`);

    const [template, image] = await Promise.all([
      templatePromise,
      imagePromise,
    ]);

    return {
      template,
      image,
    };
  }
}
