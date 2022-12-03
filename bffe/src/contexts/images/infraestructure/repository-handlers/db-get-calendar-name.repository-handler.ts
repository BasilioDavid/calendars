import { Injectable } from '@nestjs/common';
import { DBConnection } from '../../../../shared/database/db-connection';
import {
  GetInputFromRepository,
  GetOutputFromRepository,
} from '../../../../shared/utils/get-from-repository';
import { CalendarNotFoundException } from '../../core/exceptions/calendar-not-found.exception';
import { GetCalendarNameRepository } from '../../core/repositories/get-calendar-name.repository';

@Injectable()
export class DBGetCalendarNameRepositoryHandler extends GetCalendarNameRepository {
  constructor(private readonly dbConnection: DBConnection) {
    super();
  }

  async handle({
    calendarExtId,
    userId,
  }: GetInputFromRepository<GetCalendarNameRepository>): GetOutputFromRepository<GetCalendarNameRepository> {
    const calendar = await this.dbConnection
      .selectFrom('calendar')
      .where('extId', '=', calendarExtId)
      .where('calendar.userId', '=', userId)
      .select('name')
      .executeTakeFirst();

    if (!calendar) {
      throw new CalendarNotFoundException();
    }
    return { calendarName: calendar.name };
  }
}
