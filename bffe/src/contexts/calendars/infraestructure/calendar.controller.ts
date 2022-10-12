import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../../shared/auth/auth.guard';

import { CalendarService } from '../core/calendars.service';
import { CreateCalendarDto } from './DTOs/create-calendar.dto';

@Controller('calendar')
@UseGuards(AuthGuard)
export class CalendarController {
  constructor(private readonly calendarService: CalendarService) {}

  @Post('new')
  async create(@Body() body: CreateCalendarDto) {
    await this.calendarService.createCalendar(body);
  }

  @Get('list')
  getAll() {}
}
