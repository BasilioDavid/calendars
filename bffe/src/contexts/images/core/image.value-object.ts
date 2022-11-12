import {
  invariant,
  ToPrimitives,
  UUID,
  ValueObject,
} from '../../../shared/building-blocks/public_api';
import { ImageBuffer } from './value-objects/buffer';
import { Mimetype } from './value-objects/mimetype.value-object';

/* {
  fieldname: 'photos',
  originalname: '1387285.jpg',
  encoding: '7bit',
  mimetype: 'image/jpeg',
  buffer: <Buffer ff d8 ff e0 00 10 4a 46 49 46 00 01 01 00 00 01 00 01 00 00 ff db 00 84 00 06 04 05 06 05 04 06 06 05 06 07 07 06 08 0a 10 0a 0a 09 09 0a 14 0e 0f 0c ... 552325 more bytes>,
  size: 552375
}*/
// TODO: check size
interface ImageProps {
  name: UUID;
  calendarExtId: UUID;
  mimetype: Mimetype;
  buffer: ImageBuffer;
}

interface ImageFromPrimitives {
  calendarExtId: string;
  mimetype: string;
  buffer: ImageBuffer;
}

interface ImagePrimitives {
  calendarExtId: string;
  name: string;
  buffer: ImageBuffer;
}

export class Image
  extends ValueObject<ImageProps>
  implements ToPrimitives<ImagePrimitives>
{
  static fromPrimitives(data: ImageFromPrimitives) {
    return new Image({
      buffer: data.buffer,
      calendarExtId: UUID.fromPrimitives(data.calendarExtId),
      mimetype: Mimetype.fromPrimitives(data.mimetype),
      name: UUID.fromPrimitives(),
    });
  }

  constructor(props: ImageProps) {
    super(props);
    invariant('name prop must be a uuid instance', props.name instanceof UUID);
    invariant(
      'mimetype prop must be a Mimetype instance',
      props.mimetype instanceof Mimetype
    );
  }

  toPrimitives(): ImagePrimitives {
    return {
      name: `${this.props.name.toPrimitives()}.${
        this.props.mimetype.toPrimitives().split('/')[1]
      }`,
      buffer: this.props.buffer,
      calendarExtId: this.props.calendarExtId.toPrimitives(),
    };
  }
}
