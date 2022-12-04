import { Injectable } from '@nestjs/common';

import { DBConnection } from '../../../../shared/database/db-connection';
import {
  GetInputFromRepository,
  GetOutputFromRepository,
} from '../../../../shared/utils/get-from-repository';
import { CalendarNotFoundException } from '../../core/exceptions/calendar-not-found.exception';
import { GetCalendarImagesNameRepository } from '../../core/repositories/get-calendar-images-name.repository';

@Injectable()
export class DBGetCalendarImagesNameRepositoryHandler extends GetCalendarImagesNameRepository {
  constructor(private readonly dbConnection: DBConnection) {
    super();
  }

  async handle({
    calendarExtId,
    userId,
  }: GetInputFromRepository<GetCalendarImagesNameRepository>): GetOutputFromRepository<GetCalendarImagesNameRepository> {
    const userHasCalendar = await this.dbConnection
      .selectFrom('calendar')
      .where('calendar.userId', '=', userId)
      .select('calendar.id')
      .executeTakeFirst();

    if (!userHasCalendar) {
      throw new CalendarNotFoundException();
    }

    const images = await this.dbConnection
      .selectFrom('calendar')
      .innerJoin('image', 'image.calendarId', 'calendar.id')
      .where('calendar.extId', '=', calendarExtId)
      .select(['image.fileName', 'image.partNumber'])
      .orderBy('image.partNumber', 'asc')
      .execute();

    return images.map(({ fileName, partNumber }) => ({
      fileName,
      calendarMonthNumber: partNumber,
    }));
  }
}
