import { ClientError } from '../../../../shared/errors/client-error.interface';

export class NameAlreadyExistException extends ClientError {
  constructor(options?: ErrorOptions | undefined) {
    super(
      {
        code: 'NAMEALREADYEXIST',
      },
      options
    );
  }
}
