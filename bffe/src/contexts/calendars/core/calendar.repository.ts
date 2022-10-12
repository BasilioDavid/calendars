import { Injectable } from '@nestjs/common';

import { DBConnection } from '../../../shared/database/db-connection';

@Injectable()
export class CalendarRepository {
  constructor(private readonly dbConnection: DBConnection) {}

  async createCalendar({
    extId,
    name,
    userId,
    statusId,
  }: {
    extId: string;
    name: string;
    userId: number;
    statusId: number;
  }) {
    const nameAlreadyExist = await this.dbConnection
      .selectFrom('calendar')
      .where('name', '=', name)
      .orWhere('extId', '=', extId)
      .select('id')
      .executeTakeFirst();

    if (typeof nameAlreadyExist !== 'undefined') {
      throw new Error('Name or extId already exists');
    }

    await this.dbConnection
      .insertInto('calendar')
      .values([
        {
          extId,
          name,
          statusId,
          userId,
        },
      ])
      .execute();
  }
}
