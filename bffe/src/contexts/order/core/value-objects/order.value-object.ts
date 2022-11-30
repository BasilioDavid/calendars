import { Integer } from '../../../../shared/building-blocks/integer.value-object';
import { NonEmptyString } from '../../../../shared/building-blocks/non-empty-string.value-object';
import { ToPrimitives } from '../../../../shared/building-blocks/to-primitives';
import { ValueObject } from '../../../../shared/building-blocks/value-object';

interface OrderProps {
  postalCode: Integer;
  city: NonEmptyString;
  contactNumber: Integer;
  direction: NonEmptyString;
  specitfications: NonEmptyString;
  instructions: NonEmptyString;
  calendarExtId: NonEmptyString;
}

interface OrderFromPrimitives {
  postalCode: number;
  city: string;
  contactNumber: number;
  direction: string;
  specitfications: string;
  instructions: string;
  calendarExtId: string;
}

type OrderToPrimitives = OrderFromPrimitives;

export class Order
  extends ValueObject<OrderProps>
  implements ToPrimitives<OrderToPrimitives>
{
  static fromPrimitives({
    city,
    contactNumber,
    direction,
    instructions,
    postalCode,
    specitfications,
    calendarExtId,
  }: OrderFromPrimitives) {
    return new Order({
      city: new NonEmptyString({ value: city }),
      contactNumber: new Integer({ value: contactNumber }),
      direction: new NonEmptyString({ value: direction }),
      instructions: new NonEmptyString({ value: instructions }),
      postalCode: new Integer({ value: postalCode }),
      specitfications: new NonEmptyString({ value: specitfications }),
      calendarExtId: new NonEmptyString({ value: calendarExtId }),
    });
  }

  private constructor(props: OrderProps) {
    super(props);
  }

  toPrimitives(): OrderToPrimitives {
    return {
      city: this.props.city.toPrimitives(),
      contactNumber: this.props.contactNumber.toPrimitives(),
      direction: this.props.direction.toPrimitives(),
      instructions: this.props.instructions.toPrimitives(),
      postalCode: this.props.postalCode.toPrimitives(),
      specitfications: this.props.specitfications.toPrimitives(),
      calendarExtId: this.props.calendarExtId.toPrimitives(),
    };
  }
}
