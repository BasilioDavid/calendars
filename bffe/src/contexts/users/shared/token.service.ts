import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { environment } from 'src/shared/environments/environment';

@Injectable()
export class TokenService {
  generate(data: { email: string; extId: string }): string {
    return jwt.sign(data, environment.jwtSecret, {
      expiresIn: '1D',
      algorithm: 'HS256',
    });
  }
}
