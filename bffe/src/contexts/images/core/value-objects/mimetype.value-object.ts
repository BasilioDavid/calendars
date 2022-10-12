import {
  invariant,
  NonEmptyString,
  ToPrimitives,
  ValueObject,
} from '../../../../shared/building-blocks/public_api';

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
