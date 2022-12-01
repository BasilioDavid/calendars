import { Calendar } from './calendar.entity';
import { ImageEntity } from './image.entity';
import { OrderEntity } from './order.entity';
import { UserStatusEntity } from './user-status.entity';
import { UserEntity } from './user.entity';

export interface Database {
  image: ImageEntity;
  user: UserEntity;
  calendar: Calendar;
  userStatus: UserStatusEntity;
  order: OrderEntity;
}
