interface ClientErrorProps {
  code: string;
  message?: string | undefined;
}

export class ClientError extends Error {
  constructor(
    private readonly error: ClientErrorProps,
    options?: ErrorOptions | undefined
  ) {
    super(error.message, options);
  }
  serialize(): ClientErrorProps {
    return { code: this.error.code, message: this.error.message };
  }
}

export class UnknownError extends ClientError {
  constructor(message: string) {
    super({ code: 'UNKNOWN', message });
  }
}
