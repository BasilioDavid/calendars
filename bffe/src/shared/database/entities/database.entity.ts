import { Calendar } from './calendar.entity';
import { ImageEntity } from './image.entity';
import { UserStatusEntity } from './user-status.entity';
import { UserEntity } from './user.entity';

export class Database {
  image: ImageEntity;
  user: UserEntity;
  calendar: Calendar;
  userStatus: UserStatusEntity;
}
