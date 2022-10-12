import { Request } from 'express';
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

import { TokenService } from './token.service';
import { UserService } from '../user/user.service';
import { AuthRepository } from './auth.repository';

interface User {
  email: string;
  extId: string;
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
    private readonly authRepository: AuthRepository
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const token = context.switchToHttp().getRequest<Request>().headers[
      'authorization'
    ];
    if (typeof token == 'undefined') {
      throw new ForbiddenException();
    }
    const user = this.tokenService.decode<User>(token);
    const userWellformed = await this.authRepository.getUser({
      email: user.email,
      extId: user.extId,
    });
    this.userService.set(userWellformed);
    return true;
  }
}
