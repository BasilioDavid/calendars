import { Injectable } from '@nestjs/common';

import { USER_STATUS } from '../../../../shared/consts';
import { DBConnection } from '../../../../shared/database/db-connection';

@Injectable()
export class RegisterRepository {
  constructor(private readonly dbConnection: DBConnection) {}

  async handle({
    email,
    name,
    password,
    extId,
  }: {
    email: string;
    name: string;
    password: string;
    extId: string;
  }) {
    const user = await this.dbConnection
      .selectFrom('user')
      .where('email', '=', email)
      .selectAll()
      .executeTakeFirst();

    if (user) {
      throw new Error('User already exist');
    }

    await this.dbConnection
      .insertInto('user')
      .values({
        email,
        password,
        name,
        statusId: USER_STATUS['ACTIVATED'],
        extId,
      })
      .execute();
  }
}
