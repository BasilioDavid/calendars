import { Integer } from './integer.value-object';
import { invariant } from './invariant';
import { ToPrimitives } from './to-primitives';
import { ValueObject } from './value-object';

const monthNumberToText = {
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

interface MonthProp {
  number: Integer;
}

interface MonthFromPrimitives {
  number: number;
}

interface MonthToPrimitives {
  number: number;
  name: string;
}

export class Month
  extends ValueObject<MonthProp>
  implements ToPrimitives<MonthToPrimitives>
{
  static fromPrimives(value: MonthFromPrimitives): Month {
    return new Month({ number: Integer.fromPrimitives(value.number) });
  }

  private constructor(props: MonthProp) {
    const monthNumber = props.number.toPrimitives();
    invariant(
      'Month cannot be greater or equeal than 12, currently ' + monthNumber,
      monthNumber <= 12
    );
    invariant(
      'Month cannot be lower or equal than 1, currently ' + monthNumber,
      1 <= monthNumber
    );
    super(props);
  }

  toPrimitives(): MonthToPrimitives {
    return {
      number: this.props.number.toPrimitives(),
      name: monthNumberToText[this.props.number.toPrimitives()],
    };
  }
}
