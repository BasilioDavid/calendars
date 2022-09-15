import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { QueryContextService } from '../query-context/query-context.service';
import { TokenService } from './token.service';
import { Request } from 'express';

interface User {
  email: string;
  extId: string;
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly queryContext: QueryContextService,
    private readonly tokenService: TokenService
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const token = context.switchToHttp().getRequest<Request>().headers[
      'authorization'
    ];
    const user = this.tokenService.decode<User>(token);
    this.queryContext.set('user', { extId: user.extId });
    return true;
  }
}
