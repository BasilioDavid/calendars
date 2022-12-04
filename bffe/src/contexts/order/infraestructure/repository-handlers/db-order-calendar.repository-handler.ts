import { Injectable } from '@nestjs/common';
import { DBConnection } from '../../../../shared/database/db-connection';
import {
  GetInputFromRepository,
  GetOutputFromRepository,
} from '../../../../shared/utils/get-from-repository';
import { CalendarAlreadyOrderedException } from '../../core/exceptions/calendar-already-ordered.exception';
import { CalendarNotFoundException } from '../../core/exceptions/calendar-not-found.exception';
import { NotEnoughtPartsException } from '../../core/exceptions/not-enought-parts.exception';
import { OrderCalendarRepository } from '../../core/repositories/order-calendar.repository';

@Injectable()
export class DbOrderCalendarRepositoryHandler extends OrderCalendarRepository {
  constructor(private readonly dbConnection: DBConnection) {
    super();
  }

  async handle({
    calendarExtId,
    calendarStatusId,
    city,
    contactNumber,
    direction,
    instructions,
    orderedAt,
    postalCode,
    specifications,
    userId,
  }: GetInputFromRepository<OrderCalendarRepository>): GetOutputFromRepository<OrderCalendarRepository> {
    const calendarQuery = this.dbConnection
      .selectFrom('calendar')
      .where('extId', '=', calendarExtId)
      .where('calendar.userId', '=', userId)
      .select(['id', 'calendar.statusId'])
      .executeTakeFirst();

    const [calendar] = await Promise.all([calendarQuery]);

    if (!calendar) {
      throw new CalendarNotFoundException();
    }

    if (calendar.statusId === calendarStatusId) {
      throw new CalendarAlreadyOrderedException();
    }

    const calendarParts = await this.dbConnection
      .selectFrom('image')
      .where('calendarId', '=', calendar.id)
      .select('fileName')
      .execute();

    if (calendarParts.length !== 12) {
      throw new NotEnoughtPartsException();
    }

    await this.dbConnection
      .insertInto('order')
      .values([
        {
          calendarId: calendar.id,
          city,
          contactNumber,
          direction,
          postalCode,
          specifications,
          instructions,
        },
      ])
      .execute();

    await this.dbConnection
      .updateTable('calendar')
      .set({ statusId: calendarStatusId })
      .where('id', '=', calendar.id)
      .execute();
  }
}
