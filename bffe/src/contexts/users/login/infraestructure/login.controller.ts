import { Body, Controller, Post, Req } from '@nestjs/common';
import { Request } from '@nestjs/common';
import { LoginService } from '../core/login.service';
import { User } from '../core/value-objets/user.value-object';
import { UserLoginDto } from './DTOs/user-login.dto';

@Controller('user')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('login')
  login(@Req() expressRequest: Request, @Body() user: UserLoginDto): void {
    this.loginService.handle(User.fromPrimitives(user));
  }
}
