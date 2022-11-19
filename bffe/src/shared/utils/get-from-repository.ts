import { Repositoy } from '../building-blocks/domain/repository';

export type GetInputFromRepository<T> = T extends Repositoy<infer In, unknown>
  ? In
  : never;

export type GetOutputFromRepository<T> = T extends Repositoy<unknown, infer Out>
  ? Promise<Out>
  : never;
