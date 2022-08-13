import { Module } from '@nestjs/common';
import { MariadbModule } from '@syukurilexs/nestjs-mariadb';
import { environment } from 'src/shared/environments/environment';

@Module({
  imports: [
    MariadbModule.forRoot({
      host: environment.database.host,
      user: environment.database.user.user,
      password: environment.database.user.password,
      connectionLimit: 5,
      debug: !environment.production,
      trace: !environment.production,
    }),
  ],
  controllers: [],
  providers: [],
})
export class DatabaseModule {}
