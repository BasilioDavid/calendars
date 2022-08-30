import { Injectable } from '@nestjs/common';
import { LoginRepository } from './login.repository';
import { User } from './value-objets/user.value-object';

@Injectable()
export class LoginService {
  constructor(private readonly userRepository: LoginRepository) {}

  public handle(user: User) {
    const userProps = user.toPrimitives();
    return this.userRepository.handle({ ...userProps });
  }
}