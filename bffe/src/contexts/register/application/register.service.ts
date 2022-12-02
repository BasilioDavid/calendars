import { Injectable } from '@nestjs/common';
import { GenerateTokenRepository } from '../core/repositories/generate-token.repository';
import { RegisterRepository } from '../core/repositories/register.repository';
import { User } from '../core/value-objets/user.value-object';

@Injectable()
export class RegisterService {
  constructor(
    private readonly register: RegisterRepository,
    private readonly generateToken: GenerateTokenRepository
  ) {}

  public async handle(user: User): Promise<{ token: string }> {
    const userPrimitives = user.toPrimitives();
    await this.register.handle(userPrimitives);
    const token = await this.generateToken.handle({
      email: userPrimitives.email,
      extId: userPrimitives.extId,
    });
    return { token: `Bearer ${token.token}` };
  }
}
