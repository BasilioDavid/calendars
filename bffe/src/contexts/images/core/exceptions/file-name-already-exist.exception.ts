import { ClientError } from '../../../../shared/errors/client-error.interface';

export class FileNameAlreadyException extends ClientError {
  constructor(options?: ErrorOptions | undefined) {
    super(
      {
        code: 'FILENAMEALREADYEXIST',
      },
      options
    );
  }
}
