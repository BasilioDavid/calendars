import { Kysely } from 'kysely';
import { Database } from './entities/database.entity';

export class DBConnection extends Kysely<Database> {}
