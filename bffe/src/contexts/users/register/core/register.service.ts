import { Injectable } from '@nestjs/common';
import { RegisterRepository } from './register.repository';
import { User } from './value-objets/user.value-object';

@Injectable()
export class RegisterService {
  constructor(private readonly registerRepository: RegisterRepository) {}
  public handle(user: User) {
    const userPrimitives = user.toPrimitives();
    this.registerRepository.handle(userPrimitives);
  }
}
