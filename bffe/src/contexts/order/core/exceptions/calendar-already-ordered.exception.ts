import { ClientError } from '../../../../shared/errors/client-error.interface';

export class CalendarAlreadyOrderedException extends ClientError {
  constructor(options?: ErrorOptions | undefined) {
    super(
      {
        code: 'CALENDARALREADYORDERED',
      },
      options
    );
  }
}
