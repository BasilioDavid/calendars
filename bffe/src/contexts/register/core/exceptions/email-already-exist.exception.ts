import { ClientError } from '../../../../shared/errors/client-error.interface';

export class EmailAlreadyFoundException extends ClientError {
  constructor(options?: ErrorOptions | undefined) {
    super(
      {
        code: 'EMAILALREADYFOUND',
      },
      options
    );
  }
}
