import { Repositoy } from '../../../../shared/building-blocks/domain/repository';

interface RegisterRepositoryInput {
  email: string;
  name: string;
  password: string;
  extId: string;
}

export abstract class RegisterRepository extends Repositoy<
  RegisterRepositoryInput,
  void
> {}
