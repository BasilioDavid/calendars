import { NonEmptyString } from 'src/shared/building-blocks/non-empty-string.value-object';
import {
  invariant,
  ToPrimitives,
  ValueObject,
} from 'src/shared/building-blocks/public_api';

interface UserProps {
  name: NonEmptyString;
  password: NonEmptyString;
  //TODO: add email validation
  email: NonEmptyString;
}

interface UserToPrimitives {
  password: string;
  email: string;
  name: string;
}

type UserFromPrimitives = UserToPrimitives;

export class User
  extends ValueObject<UserProps>
  implements ToPrimitives<UserToPrimitives>
{
  static fromPrimitives(data: UserFromPrimitives) {
    return new User({
      password: new NonEmptyString({ value: data.password }),
      email: new NonEmptyString({ value: data.email }),
      name: new NonEmptyString({ value: data.name }),
    });
  }

  toPrimitives(): UserToPrimitives {
    return {
      email: this.props.email.toPrimitives(),
      password: this.props.password.toPrimitives(),
      name: this.props.name.toPrimitives(),
    };
  }

  constructor(data: UserProps) {
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
