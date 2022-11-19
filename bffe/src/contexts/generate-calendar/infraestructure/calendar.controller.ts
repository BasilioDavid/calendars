import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../../shared/auth/auth.guard';
import { GenerateCalendarService } from '../application/generate-calendar.service';

@Controller('calendar')
@UseGuards(AuthGuard)
export class CalendarController {
  constructor(private readonly generationCalendar: GenerateCalendarService) {}

  @Get('generate')
  generate(@Query() { calendarId }: { calendarId: string }) {
    return this.generationCalendar.generate({ calendarExtId: calendarId });
  }
}
