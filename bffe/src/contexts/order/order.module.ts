import { Module } from '@nestjs/common';
import { AuthModule } from '../../shared/auth/auth.module';

import { UserModule } from '../../shared/user/user.module';
import { OrderService } from './application/order.service';
import { OrderCalendarRepository } from './core/repositories/order-calendar.repository';
import { OrderController } from './infraestructure/order.controller';
import { DbOrderCalendarRepositoryHandler } from './infraestructure/repository-handlers/db-order-calendar.repository-handler';

@Module({
  controllers: [OrderController],
  providers: [
    OrderService,
    {
      provide: OrderCalendarRepository,
      useClass: DbOrderCalendarRepositoryHandler,
    },
  ],
  imports: [UserModule, AuthModule],
})
export class OrderModule {}
