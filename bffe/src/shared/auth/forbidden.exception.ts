import { ClientError } from '../../shared/errors/client-error.interface';

export class ForbiddenException extends ClientError {
  constructor(options?: ErrorOptions | undefined) {
    super(
      {
        code: 'FORBIDDEN',
      },
      options
    );
  }
}
