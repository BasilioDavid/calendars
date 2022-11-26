import { Repositoy } from '../../../../shared/building-blocks/domain/repository';

type GetCalendarImagesNameRepositoryInput = {
  calendarExtId: string;
  userId: number;
};

type GetCalendarImagesNameRepositoryOutput = {
  calendarMonthNumber: number;
  fileName: string;
}[];

export abstract class GetCalendarImagesNameRepository extends Repositoy<
  GetCalendarImagesNameRepositoryInput,
  GetCalendarImagesNameRepositoryOutput
> {}
