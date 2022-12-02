import { Module } from '@nestjs/common';
import { ErrorModule } from '../../shared/errors/error.module';
import { RegisterService } from './application/register.service';

import { GenerateTokenRepository } from './core/repositories/generate-token.repository';
import { RegisterRepository } from './core/repositories/register.repository';
import { RegisterController } from './infraestructure/register.controller';
import { DbGenerateTokenRepositoryHandler } from './infraestructure/repository-handlers/db-generate-token.service';
import { DbRegisterRepositoryHandler } from './infraestructure/repository-handlers/db-register.repository-handler';

@Module({
  imports: [ErrorModule],
  controllers: [RegisterController],
  providers: [
    RegisterService,
    { provide: RegisterRepository, useClass: DbRegisterRepositoryHandler },
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
export class RegisterModule {}
