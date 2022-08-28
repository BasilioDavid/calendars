import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ImagesModule } from './contexts/images/images.module';
import { UserModule } from './contexts/users/users.module';

@Module({
  imports: [ImagesModule, UserModule],
  controllers: [AppController],
})
export class AppModule {}
