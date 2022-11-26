import { Repositoy } from '../../../../shared/building-blocks/domain/repository';

type GetCalendarNameInput = {
  calendarExtId: string;
  userId: number;
};

type GetCalendarNameOutput = {
  calendarName: string;
};

export abstract class GetCalendarNameRepository extends Repositoy<
  GetCalendarNameInput,
  GetCalendarNameOutput
> {}
