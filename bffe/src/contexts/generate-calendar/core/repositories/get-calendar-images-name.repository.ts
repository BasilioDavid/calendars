import { Repositoy } from '../../../../shared/building-blocks/domain/repository';

type GetCalendarImagesNameRepositoryInput = {
  calendarExtId: string;
};

type GetCalendarImagesNameRepositoryOutput = {
  calendarMonthNumber: number;
  fileName: string;
}[];

export abstract class GetCalendarImagesNameRepository extends Repositoy<
  GetCalendarImagesNameRepositoryInput,
  GetCalendarImagesNameRepositoryOutput
> {}
