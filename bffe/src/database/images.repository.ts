import { Injectable } from '@nestjs/common';
import { Mariadb, Pool } from '@syukurilexs/nestjs-mariadb';

@Injectable()
export class ImagesRepository {
  constructor(@Mariadb() private readonly pool: Pool) {}
  async insertImage(fileName: string) {
    const conn = await this.pool.getConnection();
    const result = await conn.query('SELECT * FROM IMAGES');
    await conn.release();
    return result;
  }
}
