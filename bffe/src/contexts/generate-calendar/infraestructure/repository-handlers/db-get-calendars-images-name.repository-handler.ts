import { Injectable } from '@nestjs/common';

import { DBConnection } from '../../../../shared/database/db-connection';
import {
  GetInputFromRepository,
  GetOutputFromRepository,
} from '../../../../shared/utils/get-from-repository';
import { GetCalendarImagesNameRepository } from '../../core/repositories/get-calendar-images-name.repository';

@Injectable()
export class DBGetCalendarImagesNameRepositoryHandler extends GetCalendarImagesNameRepository {
  constructor(private readonly dbConnection: DBConnection) {
    super();
  }

  async handle({
    calendarExtId,
  }: GetInputFromRepository<GetCalendarImagesNameRepository>): GetOutputFromRepository<GetCalendarImagesNameRepository> {
    // TODO: check if the calendar belongs to the calendar
    const images = await this.dbConnection
      .selectFrom('calendar')
      .innerJoin('image', 'image.calendarId', 'calendar.id')
      .where('calendar.extId', '=', calendarExtId)
      .select(['image.fileName', 'image.monthNumber'])
      .orderBy('image.monthNumber', 'asc')
      .execute();

    return images.map(({ fileName, monthNumber }) => ({
      fileName,
      calendarMonthNumber: monthNumber,
    }));
  }
}
