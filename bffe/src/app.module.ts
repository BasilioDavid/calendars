import { Module } from '@nestjs/common';
import { ImagesModule } from './contexts/images/images.module';
import { LivecheckModule } from './contexts/livecheck/livecheck.module';
import { UserModule } from './contexts/users/users.module';

@Module({
  imports: [LivecheckModule, ImagesModule, UserModule],
})
export class AppModule {}
