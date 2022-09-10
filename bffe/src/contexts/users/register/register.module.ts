import { Module } from '@nestjs/common';
import { RegisterRepository } from './core/register.repository';
import { RegisterService } from './core/register.service';
import { TokenService } from '../shared/token.service';
import { UsersController } from './infraestructure/users.controller';

@Module({
  controllers: [UsersController],
  providers: [RegisterService, RegisterRepository, TokenService],
})
export class RegisterModule {}
