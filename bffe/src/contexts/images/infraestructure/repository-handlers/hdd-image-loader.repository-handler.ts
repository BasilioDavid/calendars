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
  }: GetInputFromRepository<ImageLoaderRepository>): GetOutputFromRepository<ImageLoaderRepository> {
    const image = await readFile(`${UTIL_FOLDER.IMAGES}/${imageName}`);

    return {
      image,
    };
  }
}
