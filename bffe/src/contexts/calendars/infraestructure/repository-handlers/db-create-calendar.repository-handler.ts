import { Injectable } from '@nestjs/common';
import { DBConnection } from '../../../../shared/database/db-connection';
import {
  GetInputFromRepository,
  GetOutputFromRepository,
} from '../../../../shared/utils/get-from-repository';

import { CreateCalendarRepository } from '../../core/repositories/create-calendar.repository';

@Injectable()
export class DBCreateCalendarRepositoryHandler extends CreateCalendarRepository {
  constructor(private readonly dbConnection: DBConnection) {
    super();
  }

  async handle({
    extId,
    name,
    userId,
    statusId,
  }: GetInputFromRepository<CreateCalendarRepository>): GetOutputFromRepository<CreateCalendarRepository> {
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
