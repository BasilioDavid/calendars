import { Repositoy } from '../../../../shared/building-blocks/domain/repository';

interface GenerateTokenRepositoryInput {
  email: string;
  extId: string;
}

interface GenerateTokenRepositoryOutput {
  token: string;
}

export abstract class GenerateTokenRepository extends Repositoy<
  GenerateTokenRepositoryInput,
  GenerateTokenRepositoryOutput
> {}
