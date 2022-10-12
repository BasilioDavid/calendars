import { invariant } from './invariant';
import { ToPrimitives } from './to-primitives';
import { ValueObject } from './value-object';

interface NumberProps {
  value: number;
}

export class Integer
  extends ValueObject<NumberProps>
  implements ToPrimitives<number>
{
  static fromPrimitives(value: number) {
    return new Integer({ value });
  }

  constructor({ value }: NumberProps) {
    super({ value });
    //TODO: add decimals validation
    invariant('Value Object must be a number', typeof value === 'number');
  }

  toPrimitives(): number {
    return this.props.value;
  }
}
