import { Injectable } from '@nestjs/common';
import { GenerateTokenRepository } from '../core/repositories/generate-token.repository';
import { LoginUserRepository } from '../core/repositories/login.repository';
import { User } from '../core/value-objets/user.value-object';

@Injectable()
export class LoginService {
  constructor(
    private readonly userRepository: LoginUserRepository,
    private readonly generateToken: GenerateTokenRepository
  ) {}

  public async handle(user: User): Promise<{ token: string }> {
    const userProps = user.toPrimitives();
    const { extId } = await this.userRepository.handle({ ...userProps });
    const rawToken = await this.generateToken.handle({
      email: userProps.email,
      extId,
    });
    return { token: `Bearer ${rawToken}` };
  }
}
