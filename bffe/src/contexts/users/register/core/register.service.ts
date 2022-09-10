import { Injectable } from '@nestjs/common';
import { RegisterRepository } from './register.repository';
import { TokenService } from '../../shared/token.service';
import { User } from './value-objets/user.value-object';

@Injectable()
export class RegisterService {
  constructor(
    private readonly registerRepository: RegisterRepository,
    private readonly tokenService: TokenService
  ) {}

  public async handle(user: User): Promise<{ token: string }> {
    const userPrimitives = user.toPrimitives();
    await this.registerRepository.handle(userPrimitives);
    const token = this.tokenService.generate({
      email: userPrimitives.email,
      extId: userPrimitives.extId,
    });
    return { token: `Bearer ${token}` };
  }
}
