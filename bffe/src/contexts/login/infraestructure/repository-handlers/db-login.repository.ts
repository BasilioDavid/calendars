import { Injectable } from '@nestjs/common';
import { DBConnection } from '../../../../shared/database/db-connection';
import {
  GetInputFromRepository,
  GetOutputFromRepository,
} from '../../../../shared/utils/get-from-repository';
import { UserNotFoundException } from '../../core/exceptions/user-not-found.exception';
import { LoginUserRepository } from '../../core/repositories/login.repository';

@Injectable()
export class DBLoginUserRepositoryHandler extends LoginUserRepository {
  constructor(private readonly dbConnection: DBConnection) {
    super();
  }

  async handle(
    user: GetInputFromRepository<LoginUserRepository>
  ): GetOutputFromRepository<LoginUserRepository> {
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
