import { v4 as uuid } from 'uuid';

export function generateUniqString(): string {
  return uuid();
}
