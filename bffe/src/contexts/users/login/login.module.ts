import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { LoginRepository } from './core/login.repository';
import { LoginService } from './core/login.service';
import { LoginController } from './infraestructure/login.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [LoginController],
  providers: [LoginService, LoginRepository],
})
export class LoginModule {}