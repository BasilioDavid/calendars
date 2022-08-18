import { Module } from '@nestjs/common';
import { CamelCasePlugin, Kysely, MysqlDialect } from 'kysely';
import { createPool } from 'mariadb';
import { environment } from 'src/shared/environments/environment';
import { DBConnection } from './db-connection';
import { Database } from './entities/database.entity';

@Module({
  providers: [
    {
      provide: DBConnection,
      useFactory: async () => {
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
        });
      },
    },
  ],
  controllers: [],
})
export class DatabaseModule {}
