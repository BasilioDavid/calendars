import { Module } from '@nestjs/common';
import { MariadbModule } from '@syukurilexs/nestjs-mariadb';

@Module({
  imports: [
    MariadbModule.forRoot({
      host: 'localhost',
      user: 'root',
      password: 'yourpassword',
      connectionLimit: 5,
    }),
  ],
  controllers: [],
  providers: [],
})
export class DatabaseModule {}
