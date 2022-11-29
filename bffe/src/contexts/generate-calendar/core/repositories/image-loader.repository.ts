import { Repositoy } from '../../../../shared/building-blocks/domain/repository';

type ImageLoaderRepositoryInput = {
  imageName: string;
};

type ImageLoaderRepositoryOutput = {
  image: Buffer;
};

export abstract class ImageLoaderRepository extends Repositoy<
  ImageLoaderRepositoryInput,
  ImageLoaderRepositoryOutput
> {}
