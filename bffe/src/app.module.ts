import { Module } from '@nestjs/common';
import { ImagesModule } from './contexts/images/images.module';
import { LivecheckModule } from './contexts/livecheck/livecheck.module';
import { LoginModule } from './contexts/users/login/login.module';
import { RegisterModule } from './contexts/users/register/register.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    LivecheckModule,
    ImagesModule,
    RegisterModule,
    LoginModule,
    DatabaseModule,
  ],
})
export class AppModule {}
