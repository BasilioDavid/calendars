import { Injectable } from '@nestjs/common';
import { DBConnection } from 'src/database/db-connection';
import { USER_STATUS } from 'src/shared/consts';
import { generateUniqString } from 'src/shared/utils/uuid';

@Injectable()
export class RegisterRepository {
  constructor(private readonly dbConnection: DBConnection) {}

  async handle({
    email,
    name,
    password,
  }: {
    email: string;
    name: string;
    password: string;
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
        extId: generateUniqString(),
     	 })
      .execute();
  }
}
