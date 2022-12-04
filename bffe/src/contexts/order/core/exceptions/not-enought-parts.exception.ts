import { ClientError } from '../../../../shared/errors/client-error.interface';

export class NotEnoughtPartsException extends ClientError {
  constructor(options?: ErrorOptions | undefined) {
    super(
      {
        code: 'NOTENGOUGHTPARTS',
      },
      options
    );
  }
}
