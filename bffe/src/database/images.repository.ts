import { Injectable } from '@nestjs/common';
import { DBConnection } from './db-connection';

@Injectable()
export class ImagesRepository {
  constructor(private readonly dbConnection: DBConnection) {}

  async insertImage(fileName: string) {
    const result = await this.dbConnection
      .selectFrom('image')
      .selectAll()
      .execute();
    return result;
  }
}
