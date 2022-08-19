import { generateUniqString } from '../utils/uuid';
import { invariant } from './invariant';
import { NonEmptyString } from './non-empty-string.value-object';
import { ToPrimitives } from './to-primitives';
import { ValueObject } from './value-object';

interface UUIDProps {
  value: NonEmptyString;
}

export class UUID
  extends ValueObject<UUIDProps>
  implements ToPrimitives<string>
{
  constructor(
    props: UUIDProps = {
      value: new NonEmptyString({ value: generateUniqString() }),
    },
  ) {
    super(props);
    invariant(
      'UUID props must be NonEmptyString instance',
      props.value instanceof NonEmptyString,
    );
  }
  toPrimitives(): string {
    return this.props.value.toPrimitives();
  }
}
