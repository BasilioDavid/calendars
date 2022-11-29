import { Integer } from './integer.value-object';
import { invariant } from './invariant';
import { ToPrimitives } from './to-primitives';
import { ValueObject } from './value-object';

const partNumberToText = {
  0: 'Cover',
  1: 'January',
  2: 'Febrary',
  3: 'March',
  4: 'April',
  5: 'May',
  6: 'June',
  7: 'July',
  8: 'Agost',
  9: 'September',
  10: 'October',
  11: 'November',
  12: 'December',
};

interface PartProp {
  number: Integer;
}

interface PartFromPrimitives {
  number: number;
}

interface PartToPrimitives {
  number: number;
  name: string;
}

export class Part
  extends ValueObject<PartProp>
  implements ToPrimitives<PartToPrimitives>
{
  static fromPrimives(value: PartFromPrimitives): Part {
    return new Part({ number: Integer.fromPrimitives(value.number) });
  }

  private constructor(props: PartProp) {
    const monthNumber = props.number.toPrimitives();
    invariant(
      'Part cannot be greater or equeal than 12, currently ' + monthNumber,
      monthNumber <= 12
    );
    invariant(
      'Part cannot be lower or equal than 0, currently ' + monthNumber,
      0 <= monthNumber
    );
    super(props);
  }

  toPrimitives(): PartToPrimitives {
    return {
      number: this.props.number.toPrimitives(),
      name: partNumberToText[this.props.number.toPrimitives()],
    };
  }
}
