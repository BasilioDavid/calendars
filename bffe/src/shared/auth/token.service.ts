import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { ForbiddenException } from './forbidden.exception';

@Injectable()
export class TokenService {
  decode<T>(rawToken: string): T {
    const [method, token] = rawToken.split(' ') || [];

    if (method !== 'Bearer' || !token) {
      throw new ForbiddenException();
    }

    return jwt.decode(token) as T;
  }
}
