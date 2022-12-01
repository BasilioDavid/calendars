import { Injectable } from '@nestjs/common';
import { DBConnection } from '../../../../shared/database/db-connection';
import { UserNotFoundException } from './exceptions/user-not-found.exception';

@Injectable()
export class LoginRepository {
  constructor(private readonly dbConnection: DBConnection) {}

  async handle(user: { email: string; password: string }) {
    const userDatabase = await this.dbConnection
      .selectFrom('user')
      .where('email', '=', user.email)
      .select(['name', 'password', 'extId'])
      .executeTakeFirst();

    if (userDatabase?.password !== user.password) {
      throw new UserNotFoundException();
    }

    return {
      extId: userDatabase.extId,
    };
  }
}
