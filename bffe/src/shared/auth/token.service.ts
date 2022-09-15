import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class TokenService {
  decode<T>(rawToken: string): T {
    const [method, token] = rawToken.split(' ') || [];

    if (method !== 'Bearer' || !token) {
      throw new Error('Unauthorized');
    }

    return jwt.decode(token) as T;
  }
}
