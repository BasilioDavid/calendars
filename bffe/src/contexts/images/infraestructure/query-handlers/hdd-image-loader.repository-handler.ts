import { Injectable } from '@nestjs/common';
import { readFile } from 'fs/promises';
import { COMMON_FOLDER } from '../../../../shared/consts';
import {
  GetInputFromRepository,
  GetOutputFromRepository,
} from '../../../../shared/utils/get-from-repository';
import { ImageLoaderRepository } from '../../core/repositories/image-loader.repository';

const imagesFolder = COMMON_FOLDER + '/images';

@Injectable()
export class HddImageLoaderRepositoryHandler extends ImageLoaderRepository {
  constructor() {
    super();
  }
  async handle({
    imageName,
  }: GetInputFromRepository<ImageLoaderRepository>): GetOutputFromRepository<ImageLoaderRepository> {
    const image = await readFile(`${imagesFolder}/${imageName}`);

    return {
      image,
    };
  }
}
