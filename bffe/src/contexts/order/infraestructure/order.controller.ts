import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../../shared/auth/auth.guard';

import { OrderService } from '../application/order.service';
import { Order } from '../core/value-objects/order.value-object';
import { OrderCalendarDto } from './DTOs/create-calendar.dto';

@Controller('order')
@UseGuards(AuthGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('')
  async create(@Body() body: OrderCalendarDto) {
    await this.orderService.orderCalendar(
      Order.fromPrimitives({
        calendarExtId: body.calendarId,
        city: body.city,
        contactNumber: body.contactNumber,
        direction: body.direction,
        instructions: body.instructions,
        postalCode: body.postalCode,
        specifications: body.specifications,
      })
    );
  }
}
