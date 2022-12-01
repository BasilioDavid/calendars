import { invariant } from './invariant';

export abstract class ValueObject<Props> {
  protected readonly props!: Props;

  constructor(props: Props) {
    invariant(
      'Props of a Value Object must be an object',
      typeof props === 'object' && typeof props != null
    );
    Object.defineProperty(this, 'props', {
      value: Object.freeze({ ...props }),
      enumerable: false,
      writable: false,
      configurable: false,
    });
  }
}
