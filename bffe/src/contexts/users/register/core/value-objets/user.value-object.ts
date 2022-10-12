import {
  invariant,
  NonEmptyString,
  ToPrimitives,
  UUID,
  ValueObject,
} from '../../../../../shared/building-blocks/public_api';

interface UserProps {
  name: NonEmptyString;
  password: NonEmptyString;
  //TODO: add email validation
  email: NonEmptyString;
  extId: UUID;
}

interface UserToPrimitives {
  password: string;
  email: string;
  name: string;
  extId: string;
}

type UserFromPrimitives = {
  password: string;
  email: string;
  name: string;
};

export class User
  extends ValueObject<UserProps>
  implements ToPrimitives<UserToPrimitives>
{
  static fromPrimitives(data: UserFromPrimitives) {
    return new User({
      password: new NonEmptyString({ value: data.password }),
      email: new NonEmptyString({ value: data.email }),
      name: new NonEmptyString({ value: data.name }),
      extId: new UUID(),
    });
  }

  toPrimitives(): UserToPrimitives {
    return {
      email: this.props.email.toPrimitives(),
      password: this.props.password.toPrimitives(),
      name: this.props.name.toPrimitives(),
      extId: this.props.extId.toPrimitives(),
    };
  }

  private constructor(data: UserProps) {
    invariant(
      'password must be a NonEmptyString instance',
      data.password instanceof NonEmptyString
    );
    invariant(
      'email must be a NonEmptyString instance',
      data.email instanceof NonEmptyString
    );
    invariant(
      'name must be a NonEmptyString instance',
      data.name instanceof NonEmptyString
    );
    super(data);
  }
}
