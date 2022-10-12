import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthGuard } from './auth.guard';
import { AuthRepository } from './auth.repository';
import { TokenService } from './token.service';

@Module({
  imports: [UserModule],
  providers: [AuthGuard, TokenService, AuthRepository],
  exports: [TokenService, AuthGuard, AuthRepository, UserModule],
})
export class AuthModule {}
