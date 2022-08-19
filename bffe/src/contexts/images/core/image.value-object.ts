import {
  invariant,
  NonEmptyString,
  ToPrimitives,
  ValueObject,
} from 'src/shared/building-blocks/public_api';
import { UUID } from 'src/shared/building-blocks/uuid.value-object';

interface ImageProps {
  id: UUID;
  name: UUID;
  buffer: Express.Multer.File;
}

interface ImagePrimitives {
  id: string;
  name: string;
  buffer: Express.Multer.File;
}

export class Image
  extends ValueObject<ImageProps>
  implements ToPrimitives<ImagePrimitives>
{
  constructor(props: ImageProps) {
    super(props);
    invariant('id prop must be a uuid', props.id instanceof UUID);
    invariant('name prop must be a uuid', props.name instanceof UUID);
  }

  toPrimitives(): ImagePrimitives {
    return {
      id: this.props.id.toPrimitives(),
      name: this.props.name.toPrimitives(),
      buffer: this.props.buffer,
    };
  }
}
