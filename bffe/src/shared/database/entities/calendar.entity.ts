import { Generated } from 'kysely';

export interface Calendar {
  id: Generated<number>;
  extId: string;
  name: string;
  userId: number;
  statusId: number;
}
