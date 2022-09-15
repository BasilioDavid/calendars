import { Global, Module } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { TokenService } from './token.service';

@Global()
@Module({ providers: [AuthGuard, TokenService], exports: [TokenService] })
export class AuthModule {}
