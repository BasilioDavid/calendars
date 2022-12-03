import { Injectable } from '@nestjs/common';
import { format } from 'date-fns';

import { CALENDAR_STATUS, MYSQL_DATETIME_FORMAT } from '../../../shared/consts';
import { UserService } from '../../../shared/user/user.service';
import { OrderCalendarRepository } from '../core/repositories/order-calendar.repository';
import { Order } from '../core/value-objects/order.value-object';

@Injectable()
export class OrderService {
  constructor(
    private readonly userService: UserService,
    private readonly orderCalendarRepository: OrderCalendarRepository
  ) {}

  async orderCalendar(order: Order) {
    const params = order.toPrimitives();
    await this.orderCalendarRepository.handle({
      calendarExtId: params.calendarExtId,
      calendarStatusId: CALENDAR_STATUS.IN_SHIPPING,
      city: params.city,
      contactNumber: params.contactNumber,
      direction: params.direction,
      instructions: params.instructions,
      orderedAt: format(new Date(), MYSQL_DATETIME_FORMAT),
      postalCode: params.postalCode,
      specifications: params.specifications,
      userId: this.userService.get().id,
    });
  }
}
