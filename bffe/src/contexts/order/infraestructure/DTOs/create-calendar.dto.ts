export interface OrderCalendarDto {
  postalCode: string;
  city: string;
  contactNumber: string;
  direction: string;
  specifications?: string | undefined;
  instructions?: string | undefined;
  calendarId: string;
  wrapper: boolean;
}
