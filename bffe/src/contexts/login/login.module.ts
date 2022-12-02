import { Module } from '@nestjs/common';
import { ErrorModule } from '../../shared/errors/error.module';

import { LoginService } from './application/login.service';
import { GenerateTokenRepository } from './core/repositories/generate-token.repository';
import { LoginUserRepository } from './core/repositories/login.repository';
import { LoginController } from './infraestructure/login.controller';
import { DbGenerateTokenRepositoryHandler } from './infraestructure/repository-handlers/db-generate-token.service';
import { DBLoginUserRepositoryHandler } from './infraestructure/repository-handlers/db-login.repository';

@Module({
  imports: [ErrorModule],
  controllers: [LoginController],
  providers: [
    LoginService,
    { provide: LoginUserRepository, useClass: DBLoginUserRepositoryHandler },
    {
      provide: GenerateTokenRepository,
      useClass: DbGenerateTokenRepositoryHandler,
    },
    {
      provide: GenerateTokenRepository,
      useClass: DbGenerateTokenRepositoryHandler,
    },
  ],
})
export class LoginModule {}
