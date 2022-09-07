import { NonEmptyString } from 'src/shared/building-blocks/non-empty-string.value-object';
import {
  invariant,
  ToPrimitives,
  ValueObject,
} from 'src/shared/building-blocks/public_api';

interface UserProps {
  password: NonEmptyString;
  //TODO: add email validation
  email: NonEmptyString;
}

interface UserToPrimitives {
  password: string;
  email: string;
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
    });
  }

  toPrimitives(): UserToPrimitives {
    return {
      email: this.props.email.toPrimitives(),
      password: this.props.password.toPrimitives(),
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
    super(data);
  }
}
