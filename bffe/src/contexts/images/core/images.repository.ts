import { Injectable } from '@nestjs/common';
import { DBConnection } from '../../../shared/database/db-connection';

@Injectable()
export class ImagesRepository {
  constructor(private readonly dbConnection: DBConnection) {}

  insertImage(fileName: string) {
    return this.dbConnection
      .insertInto('image')
      .values({ fileName })
      .executeTakeFirstOrThrow();
  }
}
