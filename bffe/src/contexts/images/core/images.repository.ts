import { Injectable } from '@nestjs/common';
import { DBConnection } from '../../../shared/database/db-connection';

@Injectable()
export class ImagesRepository {
  constructor(private readonly dbConnection: DBConnection) {}

  async insertImage(fileName: string) {
    const fileNameAlreadyExist = await this.dbConnection
      .selectFrom('image')
      .where('fileName', '=', fileName)
      .select('id')
      .executeTakeFirst();

    if (fileNameAlreadyExist) {
      throw new Error('Filename duplicated');
    }

    return this.dbConnection
      .insertInto('image')
      .values({ fileName })
      .executeTakeFirstOrThrow();
  }
}
