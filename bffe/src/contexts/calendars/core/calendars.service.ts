import { Injectable } from '@nestjs/common';

import { CALENDAR_STATUS } from '../../../shared/consts';
import { UserService } from '../../../shared/user/user.service';
import { CalendarRepository } from './calendar.repository';
import { Calendar } from './calendar.value-object';

@Injectable()
export class CalendarService {
  constructor(
    private readonly calendarsRepository: CalendarRepository,
    private readonly userService: UserService
  ) {}

  async createCalendar({ name }: { name: string }) {
    const params = Calendar.fromPrimitives({
      name,
      userId: this.userService.get().id,
      statusId: CALENDAR_STATUS.CREATING,
    }).toPrimitives();
    await this.calendarsRepository.createCalendar(params);
  }

  getAllCalendars(): Promise<
    {
      extId: string;
      name: string;
      statusId: number;
    }[]
  > {
    return this.calendarsRepository.getAllCalendars({
      userId: this.userService.get().id,
    });
  }
}
