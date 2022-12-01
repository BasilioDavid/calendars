import { Module } from '@nestjs/common';

import { ErrorModule } from '../../../shared/errors/error.module';
import { TokenService } from '../shared/token.service';
import { LoginRepository } from './core/login.repository';
import { LoginService } from './core/login.service';
import { LoginController } from './infraestructure/login.controller';
import { LoginExceptionFilter } from './login.exception-filter';

@Module({
  imports: [ErrorModule],
  controllers: [LoginController],
  providers: [
    LoginService,
    LoginRepository,
    TokenService,
    LoginExceptionFilter,
  ],
})
export class LoginModule {}
