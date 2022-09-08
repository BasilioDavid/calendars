import { Module } from '@nestjs/common';
import { RegisterRepository } from './core/register.repository';
import { RegisterService } from './core/register.service';
import { UsersController } from './infraestructure/users.controller';

@Module({
  controllers: [UsersController],
  providers: [RegisterService, RegisterRepository],
})
export class RegisterModule {}
