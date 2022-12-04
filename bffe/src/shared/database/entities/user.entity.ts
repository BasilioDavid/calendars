import { Generated } from 'kysely';

export interface UserEntity {
  id: Generated<number>;
  extId: string;
  name: string;
  password: string;
  email: string;
  createAt?: string | undefined;
  statusId: number;
}
