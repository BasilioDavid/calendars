import { NonEmptyString } from '../../../../shared/building-blocks/non-empty-string.value-object';
import { ToPrimitives } from '../../../../shared/building-blocks/to-primitives';
import { ValueObject } from '../../../../shared/building-blocks/value-object';

interface OrderProps {
  postalCode: NonEmptyString;
  city: NonEmptyString;
  contactNumber: NonEmptyString;
  direction: NonEmptyString;
  specifications?: NonEmptyString | undefined;
  instructions?: NonEmptyString | undefined;
  calendarExtId: NonEmptyString;
  wrapper: boolean;
}

interface OrderFromPrimitives {
  postalCode: string;
  city: string;
  contactNumber: string;
  direction: string;
  specifications?: string | undefined;
  instructions?: string | undefined;
  calendarExtId: string;
  wrapper: boolean;
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
    specifications,
    calendarExtId,
    wrapper,
  }: OrderFromPrimitives) {
    return new Order({
      city: new NonEmptyString({ value: city }),
      contactNumber: new NonEmptyString({ value: contactNumber }),
      direction: new NonEmptyString({ value: direction }),
      instructions:
        typeof instructions === 'undefined' || instructions?.length === 0
          ? undefined
          : new NonEmptyString({ value: instructions }),
      postalCode: new NonEmptyString({ value: postalCode }),
      specifications:
        typeof specifications === 'undefined' || specifications?.length === 0
          ? undefined
          : new NonEmptyString({ value: specifications }),
      calendarExtId: new NonEmptyString({ value: calendarExtId }),
      wrapper,
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
      instructions: this.props.instructions?.toPrimitives(),
      postalCode: this.props.postalCode.toPrimitives(),
      specifications: this.props.specifications?.toPrimitives(),
      calendarExtId: this.props.calendarExtId.toPrimitives(),
      wrapper: this.props.wrapper,
    };
  }
}
