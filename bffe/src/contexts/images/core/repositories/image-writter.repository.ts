import { Repositoy } from '../../../../shared/building-blocks/domain/repository';

type ImageWritterRepositoryInput = {
  fileName: string;
  file: Buffer;
};

export abstract class ImageWritterImagesRepository extends Repositoy<
  ImageWritterRepositoryInput,
  void
> {}
