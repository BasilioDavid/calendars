import { Injectable } from '@nestjs/common';
import { format } from 'date-fns';

import { MYSQL_DATETIME_FORMAT, USER_STATUS } from '../../../../shared/consts';
import { DBConnection } from '../../../../shared/database/db-connection';
import {
  GetInputFromRepository,
  GetOutputFromRepository,
} from '../../../../shared/utils/get-from-repository';
import { EmailAlreadyFoundException } from '../../core/exceptions/email-already-exist.exception';
import { RegisterRepository } from '../../core/repositories/register.repository';

@Injectable()
export class DbRegisterRepositoryHandler extends RegisterRepository {
  constructor(private readonly dbConnection: DBConnection) {
    super();
  }

  async handle({
    email,
    name,
    password,
    extId,
  }: GetInputFromRepository<RegisterRepository>): GetOutputFromRepository<RegisterRepository> {
    const user = await this.dbConnection
      .selectFrom('user')
      .where('email', '=', email)
      .selectAll()
      .executeTakeFirst();

    if (user) {
      throw new EmailAlreadyFoundException();
    }

    await this.dbConnection
      .insertInto('user')
      .values({
        email,
        password,
        createAt: format(new Date(), MYSQL_DATETIME_FORMAT),
        name,
        statusId: USER_STATUS['ACTIVATED'],
        extId,
      })
      .execute();
  }
}
