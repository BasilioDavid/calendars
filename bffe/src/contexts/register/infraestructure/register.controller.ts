import { Body, Controller, Post } from '@nestjs/common';
import { RegisterService } from '../application/register.service';
import { User } from '../core/value-objets/user.value-object';
import { UserRegisterDto } from './DTOs/user-register.dto';

@Controller('user')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post('register')
  register(@Body() data: UserRegisterDto): Promise<{ token: string }> {
    return this.registerService.handle(User.fromPrimitives({ ...data }));
  }
}
