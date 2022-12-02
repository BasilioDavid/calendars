import { Repositoy } from '../../../../shared/building-blocks/domain/repository';

type ListCalendarsRepositoryInput = {
  userId: number;
};

type ListCalendarsRepositoryOutput = {
  extId: string;
  name: string;
  statusId: number;
  imageName?: string | undefined;
}[];

export abstract class ListCalendarsRepository extends Repositoy<
  ListCalendarsRepositoryInput,
  ListCalendarsRepositoryOutput
> {}
