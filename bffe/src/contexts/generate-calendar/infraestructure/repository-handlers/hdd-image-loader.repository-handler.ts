import { Injectable } from '@nestjs/common';
import { readFile } from 'fs/promises';
import { COMMON_FOLDER } from '../../../../shared/consts';
import {
  GetInputFromRepository,
  GetOutputFromRepository,
} from '../../../../shared/utils/get-from-repository';
import { ImageLoaderRepository } from '../../core/repositories/image-loader.repository';

const templateFolder = COMMON_FOLDER + '/templates';
const imagesFolder = COMMON_FOLDER + '/images';

@Injectable()
export class HddImageLoaderRepositoryHandler extends ImageLoaderRepository {
  constructor() {
    super();
  }
  async handle({
    imageName,
    templateName,
  }: GetInputFromRepository<ImageLoaderRepository>): GetOutputFromRepository<ImageLoaderRepository> {
    const templatePromise = readFile(`${templateFolder}/${templateName}`);
    const imagePromise = readFile(`${imagesFolder}/${imageName}`);

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
