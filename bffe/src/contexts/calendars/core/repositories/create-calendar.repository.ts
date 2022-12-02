import { Repositoy } from '../../../../shared/building-blocks/domain/repository';

type CreateCalendarRepositoryInput = {
  extId: string;
  name: string;
  userId: number;
  statusId: number;
};

export abstract class CreateCalendarRepository extends Repositoy<
  CreateCalendarRepositoryInput,
  void
> {}
