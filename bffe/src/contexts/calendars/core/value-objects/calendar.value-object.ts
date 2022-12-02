import { Integer } from '../../../../shared/building-blocks/integer.value-object';
import { NonEmptyString } from '../../../../shared/building-blocks/non-empty-string.value-object';
import { ToPrimitives } from '../../../../shared/building-blocks/to-primitives';
import { UUID } from '../../../../shared/building-blocks/uuid.value-object';
import { ValueObject } from '../../../../shared/building-blocks/value-object';

interface CalendarProps {
  name: NonEmptyString;
  extId: UUID;
  userId: Integer;
  statusId: Integer;
}

interface CalendarFromPrimitives {
  name: string;
  userId: number;
  statusId: number;
}

type CalendarToPrimitives = {
  name: string;
  extId: string;
  userId: number;
  statusId: number;
};

export class Calendar
  extends ValueObject<CalendarProps>
  implements ToPrimitives<CalendarToPrimitives>
{
  static fromPrimitives({ name, statusId, userId }: CalendarFromPrimitives) {
    return new Calendar({
      extId: new UUID(),
      name: new NonEmptyString({ value: name }),
      statusId: new Integer({ value: statusId }),
      userId: new Integer({ value: userId }),
    });
  }

  private constructor(props: CalendarProps) {
    super(props);
  }

  toPrimitives(): CalendarToPrimitives {
    return {
      extId: this.props.extId.toPrimitives(),
      name: this.props.name.toPrimitives(),
      statusId: this.props.statusId.toPrimitives(),
      userId: this.props.userId.toPrimitives(),
    };
  }
}
