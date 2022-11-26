import { Injectable } from '@nestjs/common';
import { DBConnection } from '../../../../shared/database/db-connection';
import {
  GetInputFromRepository,
  GetOutputFromRepository,
} from '../../../../shared/utils/get-from-repository';
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
    userId,
  }: GetInputFromRepository<UploadImagesRepository>): GetOutputFromRepository<UploadImagesRepository> {
    const fileNameAlreadyExistQuery = this.dbConnection
      .selectFrom('image')
      .where('fileName', '=', fileName)
      .select('fileName')
      .executeTakeFirst();

    const calendarQuery = this.dbConnection
      .selectFrom('calendar')
      .where('extId', '=', calendarExtId)
      .where('calendar.userId', '=', userId)
      .select('id')
      .executeTakeFirst();

    const [calendar, fileNameAlreadyExist] = await Promise.all([
      calendarQuery,
      fileNameAlreadyExistQuery,
    ]);

    //TODO: handle this error in a diferent way
    if (fileNameAlreadyExist) {
      throw new Error('Filename duplicated');
    }

    if (!calendar) {
      throw new Error('Calendar not found');
    }

    const partImageAlreadyExist = await this.dbConnection
      .selectFrom('image')
      .where('calendarId', '=', calendar.id)
      .where('partNumber', '=', partNumber)
      .select('image.fileName')
      .executeTakeFirst();

    if (partImageAlreadyExist) {
      await this.dbConnection
        .updateTable('image')
        .set({ fileName })
        .where('calendarId', '=', calendar.id)
        .where('partNumber', '=', partNumber)
        .execute();
    } else {
      await this.dbConnection
        .insertInto('image')
        .values({ fileName, calendarId: calendar.id, partNumber })
        .execute();
    }
  }
}
