import { Module } from '@nestjs/common';
import { RegisterRepository } from './register/core/register.repository';
import { RegisterService } from './register/core/register.service';
import { UsersController } from './register/infraestructure/users.controller';

@Module({
  controllers: [UsersController],
  providers: [RegisterService, RegisterRepository],
})
export class RegisterModule {}
