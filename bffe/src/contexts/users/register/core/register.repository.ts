import { Injectable } from '@nestjs/common';
import { DBConnection } from 'src/shared/database/db-connection';
import { USER_STATUS } from 'src/shared/consts';

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
        status_id: USER_STATUS['ACTIVATED'],
        extId,
      })
      .execute();
  }
}
