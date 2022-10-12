import { Injectable } from '@nestjs/common';
import { USER_STATUS } from '../consts';
import { DBConnection } from '../database/db-connection';

@Injectable()
export class AuthRepository {
  constructor(private readonly dbConnection: DBConnection) {}

  async getUser({
    extId,
    email,
  }: {
    extId: string;
    email: string;
  }): Promise<{ id: number; name: string; status: number }> {
    const user = await this.dbConnection
      .selectFrom('user')
      .where('extId', '=', extId)
      .where('extId', '=', email)
      .select(['id', 'name'])
      .executeTakeFirst();

    return {
      id: user.id,
      name: user.name,
      //TODO: obtain this from db
      status: USER_STATUS.ACTIVATED,
    };
  }
}
