import { ClientError } from '../../../../shared/errors/client-error.interface';

export class CalendarNotFoundException extends ClientError {
  constructor(options?: ErrorOptions | undefined) {
    super(
      {
        code: 'CALENDARNOTFOUND',
      },
      options
    );
  }
}
