import { Body, Controller, Post } from '@nestjs/common';
import { LoginService } from '../application/login.service';

import { User } from '../core/value-objets/user.value-object';
import { UserLoginDto } from './DTOs/user-login.dto';

@Controller('user')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('login')
  login(@Body() user: UserLoginDto): Promise<{ token: string }> {
    return this.loginService.handle(User.fromPrimitives(user));
  }
}
