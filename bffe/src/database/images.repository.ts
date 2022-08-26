import { Injectable } from '@nestjs/common';
import { DBConnection } from './db-connection';

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
