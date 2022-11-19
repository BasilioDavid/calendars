import { Repositoy } from '../../../../shared/building-blocks/domain/repository';

type ImageLoaderRepositoryInput = {
  templateName: string;
  imageName: string;
};

type ImageLoaderRepositoryOutput = {
  template: Buffer;
  image: Buffer;
};

export abstract class ImageLoaderRepository extends Repositoy<
  ImageLoaderRepositoryInput,
  ImageLoaderRepositoryOutput
> {}
