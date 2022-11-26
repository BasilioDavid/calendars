import { Injectable } from '@nestjs/common';
import { DBConnection } from '../../../../shared/database/db-connection';
import { UploadImagesRepository } from '../../core/repositories/upload-images.repository';

@Injectable()
export class DBUploadImagesRepositoryHandler extends UploadImagesRepository {
  constructor(private readonly dbConnection: DBConnection) {
    super();
  }

  async handle({
    fileName,
    calendarExtId,
    partNumber,
  }: {
    fileName: string;
    calendarExtId: string;
    partNumber: number;
  }): Promise<void> {
    const fileNameAlreadyExistQuery = this.dbConnection
      .selectFrom('image')
      .where('fileName', '=', fileName)
      .select('fileName')
      .executeTakeFirst();

    const calendarQuery = this.dbConnection
      .selectFrom('calendar')
      .where('extId', '=', calendarExtId)
      .select('id')
      .executeTakeFirst();

    const [calendar, fileNameAlreadyExist] = await Promise.all([
      calendarQuery,
      fileNameAlreadyExistQuery,
    ]);

    if (fileNameAlreadyExist) {
      throw new Error('Filename duplicated');
    }

    if (!calendar) {
      throw new Error('Calendar not found');
    }

    await this.dbConnection
      .insertInto('image')
      .values({ fileName, calendarId: calendar.id, partNumber })
      .executeTakeFirstOrThrow();
  }
}
