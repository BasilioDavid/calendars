import { invariant } from 'src/shared/building-blocks/invariant';
import { NonEmptyString } from 'src/shared/building-blocks/non-empty-string.value-object';
import { ToPrimitives } from 'src/shared/building-blocks/to-primitives';
import { ValueObject } from 'src/shared/building-blocks/value-object';

interface MimetypeInput {
  value: NonEmptyString;
}

const validMimetypes = ['image/jpeg', 'image/x-png'];

export class Mimetype
  extends ValueObject<MimetypeInput>
  implements ToPrimitives<string>
{
  static fromPrimitives(value: string) {
    return new Mimetype({ value: NonEmptyString.fromPrimitives(value) });
  }

  constructor(data: MimetypeInput) {
    super(data);
    const type = data.value.toPrimitives();
    invariant('MimeType not suported', validMimetypes.includes(type));
  }

  toPrimitives(): string {
    return this.props.value.toPrimitives();
  }
}
