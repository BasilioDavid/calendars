import { Repositoy } from '../../../../shared/building-blocks/domain/repository';

type ImageLoaderRepositoryInput = {
  fileName: string;
  calendarExtId: string;
  partNumber: number;
};

export abstract class UploadImagesRepository extends Repositoy<
  ImageLoaderRepositoryInput,
  void
> {}
