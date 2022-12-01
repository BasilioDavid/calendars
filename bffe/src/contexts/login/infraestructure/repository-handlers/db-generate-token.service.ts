import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

import { environment } from '../../../../shared/environments/environment';
import {
  GetInputFromRepository,
  GetOutputFromRepository,
} from '../../../../shared/utils/get-from-repository';
import { GenerateTokenRepository } from '../../core/repositories/generate-token.repository';

@Injectable()
export class DbGenerateTokenRepositoryHandler extends GenerateTokenRepository {
  async handle(
    data: GetInputFromRepository<GenerateTokenRepository>
  ): GetOutputFromRepository<GenerateTokenRepository> {
    return {
      token: jwt.sign(data, environment.jwtSecret, {
        expiresIn: '1D',
        algorithm: 'HS256',
      }),
    };
  }
}
