import { Injectable } from '@nestjs/common';
import { TokenService } from '../../shared/token.service';
import { LoginRepository } from './login.repository';
import { User } from './value-objets/user.value-object';

@Injectable()
export class LoginService {
  constructor(
    private readonly userRepository: LoginRepository,
    private readonly tokenService: TokenService
  ) {}

  public async handle(user: User): Promise<{ token: string }> {
    const userProps = user.toPrimitives();
    const { extId } = await this.userRepository.handle({ ...userProps });
    const rawToken = this.tokenService.generate({
      email: userProps.email,
      extId,
    });
    return { token: `Bearer ${rawToken}` };
  }
}
