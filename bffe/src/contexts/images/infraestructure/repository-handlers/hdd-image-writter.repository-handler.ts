import { Injectable } from '@nestjs/common';
import { writeFile } from 'fs/promises';
import { UTIL_FOLDER } from '../../../../shared/consts';
import {
  GetInputFromRepository,
  GetOutputFromRepository,
} from '../../../../shared/utils/get-from-repository';
import { ImageWritterImagesRepository } from '../../core/repositories/image-writter.repository';

@Injectable()
export class HddImageWritterRepositoryHandler extends ImageWritterImagesRepository {
  constructor() {
    super();
  }
  async handle({
    file,
    fileName,
  }: GetInputFromRepository<ImageWritterImagesRepository>): GetOutputFromRepository<ImageWritterImagesRepository> {
    await writeFile(`${UTIL_FOLDER.IMAGES}/${fileName}`, file);
  }
}
