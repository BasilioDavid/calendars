import {
  invariant,
  NonEmptyString,
  ToPrimitives,
  ValueObject,
} from 'src/shared/building-blocks/public_api';
import { UUID } from 'src/shared/building-blocks/uuid.value-object';

interface ImageProps {
  name: UUID;
  buffer: Express.Multer.File;
}

interface ImagePrimitives {
  name: string;
  buffer: Express.Multer.File;
}

export class Image
  extends ValueObject<ImageProps>
  implements ToPrimitives<ImagePrimitives>
{
  constructor(props: ImageProps) {
    super(props);
    invariant('name prop must be a uuid', props.name instanceof UUID);
  }

  toPrimitives(): ImagePrimitives {
    return {
      name: this.props.name.toPrimitives(),
      buffer: this.props.buffer,
    };
  }
}
