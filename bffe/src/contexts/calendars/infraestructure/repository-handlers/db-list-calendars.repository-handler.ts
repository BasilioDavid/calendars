import { Injectable } from '@nestjs/common';
import { DBConnection } from '../../../../shared/database/db-connection';
import {
  GetInputFromRepository,
  GetOutputFromRepository,
} from '../../../../shared/utils/get-from-repository';

import { ListCalendarsRepository } from '../../core/repositories/list-calendars.repository';

@Injectable()
export class DbListCalendarsRepositoryHandler extends ListCalendarsRepository {
  constructor(private readonly dbConnection: DBConnection) {
    super();
  }

  async handle({
    userId,
  }: GetInputFromRepository<ListCalendarsRepository>): GetOutputFromRepository<ListCalendarsRepository> {
    const calendars = await this.dbConnection
      .selectFrom('calendar')
      .where('calendar.userId', '=', userId)
      .select(['extId', 'name', 'statusId', 'id'])
      .execute();

    if (!calendars.length) {
      return [];
    }

    const images = await this.dbConnection
      .selectFrom('image')
      .where(
        'calendarId',
        'in',
        calendars.map(({ id }) => id)
      )
      .where('partNumber', '=', 0)
      .select(['calendarId', 'fileName'])
      .execute();

    const imagesMapped = new Map<number, string>();

    for (const image of images) {
      imagesMapped.set(image.calendarId, image.fileName);
    }

    return calendars.map(({ extId, id, name, statusId }) => ({
      extId,
      name,
      statusId,
      imageName: imagesMapped.get(id),
    }));
  }
}
