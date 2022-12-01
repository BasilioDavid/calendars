import { ClientError } from '../../../../../shared/errors/client-error.interface';

export class UserNotFoundException extends ClientError {
  constructor(options?: ErrorOptions | undefined) {
    super(
      {
        code: 'USERNOTFOUND',
      },
      options
    );
  }
}
