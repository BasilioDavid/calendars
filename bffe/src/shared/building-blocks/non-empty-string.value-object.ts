import { invariant } from './invariant';
import { ToPrimitives } from './to-primitives';
import { ValueObject } from './value-object';

interface NonEmptyStringProps {
  value: string;
}

export class NonEmptyString
  extends ValueObject<NonEmptyStringProps>
  implements ToPrimitives<string>
{
  static fromPrimitives(value: string) {
    return new NonEmptyString({ value });
  }

  constructor({ value }: NonEmptyStringProps) {
    super({ value });
    invariant(
      'Value Object must be a non empty string',
      typeof value === 'string' && value.length > 0,
    );
  }

  toPrimitives(): string {
    return this.props.value;
  }
}
