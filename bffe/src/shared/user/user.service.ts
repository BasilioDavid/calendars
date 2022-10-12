import { Injectable } from '@nestjs/common';
import { ContextService } from '../context/context.service';

interface User {
  id: number;
  name: string;
  status: number;
}

const userKey = 'user';

@Injectable()
export class UserService {
  constructor(private readonly context: ContextService<User>) {}

  set(user: User): void {
    if (this.exist()) {
      throw new Error('Trying to set user twice');
    }
    this.context.set(userKey, user);
  }

  get(): User {
    if (!this.exist()) {
      throw new Error('Trying to get user before being initialized');
    }
    return this.context.get(userKey);
  }

  exist(): boolean {
    return !!this.context.get(userKey);
  }
}
