import { createPool } from 'mysql2';
import { CamelCasePlugin, Kysely, MysqlDialect } from 'kysely';
import { Global, Module } from '@nestjs/common';

import { DBConnection } from './db-connection';
import { Database } from './entities/database.entity';
import { environment } from '../environments/environment';

@Global()
@Module({
  providers: [
    {
      provide: DBConnection,
      useFactory: () =>
        new Kysely<Database>({
          dialect: new MysqlDialect({
            pool: createPool({
              host: environment.database.host,
              database: environment.database.name,
              user: environment.database.user.user,
              password: environment.database.user.password,
              connectionLimit: 5,
              debug: !environment.production,
              trace: !environment.production,
            }),
          }),
          plugins: [new CamelCasePlugin()],
          log(event) {
            console.log(event);
          },
        }),
    },
  ],
  exports: [DBConnection],
  controllers: [],
})
export class DatabaseModule {}
