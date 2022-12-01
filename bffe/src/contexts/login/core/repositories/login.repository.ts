import { Repositoy } from '../../../../shared/building-blocks/domain/repository';

interface LoginUserRepositoryInput {
  email: string;
  password: string;
}

interface LoginUserRepositoryOutput {
  extId: string;
}

export abstract class LoginUserRepository extends Repositoy<
  LoginUserRepositoryInput,
  LoginUserRepositoryOutput
> {}
