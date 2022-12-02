import { Injectable } from '@nestjs/common';

import { CALENDAR_STATUS } from '../../../shared/consts';
import { UserService } from '../../../shared/user/user.service';
import { CreateCalendarRepository } from '../core/repositories/create-calendar.repository';
import { ImageLoaderRepository } from '../core/repositories/image-loader.repository';
import { ListCalendarsRepository } from '../core/repositories/list-calendars.repository';
import { Calendar } from '../core/value-objects/calendar.value-object';

@Injectable()
export class CalendarService {
  constructor(
    private readonly createCalendarRepositoryHandler: CreateCalendarRepository,
    private readonly listCalendarsRepositoryHandler: ListCalendarsRepository,
    private readonly imageLoaderRepositoryHandler: ImageLoaderRepository,
    private readonly userService: UserService
  ) {}

  async createCalendar({ name }: { name: string }) {
    const params = Calendar.fromPrimitives({
      name,
      userId: this.userService.get().id,
      statusId: CALENDAR_STATUS.CREATING,
    }).toPrimitives();
    await this.createCalendarRepositoryHandler.handle(params);
  }

  async getAllCalendars(): Promise<
    {
      extId: string;
      name: string;
      statusId: number;
      image: string;
    }[]
  > {
    const calendar = await this.listCalendarsRepositoryHandler.handle({
      userId: this.userService.get().id,
    });
    const calendarsWithImgs: any = [];
    for (const { imageName, extId, name, statusId } of calendar) {
      let image: string | undefined = undefined;
      if (typeof imageName !== 'undefined') {
        const output = await this.imageLoaderRepositoryHandler.handle({
          imageName,
        });
        image = output.image.toString();
      }
      calendarsWithImgs.push({
        extId,
        name,
        statusId,
        // TODO: move this into output VO
        image: image ? 'data:image/png;base64, ' + image : undefined,
      });
    }
    return calendarsWithImgs;
  }
}
