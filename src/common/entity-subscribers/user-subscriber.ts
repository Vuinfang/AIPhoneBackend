import type {
  EntitySubscriberInterface,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { EventSubscriber } from 'typeorm';

import { UserEntity } from '../../core/user/user.entity';
import { UtilsProvider } from '../providers';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<UserEntity> {
  listenTo(): typeof UserEntity {
    return UserEntity;
  }

  beforeInsert(event: InsertEvent<UserEntity>): void {
    if (event.entity.password) {
      event.entity.salt = UtilsProvider.generateRandomString(6);
      event.entity.password = UtilsProvider.encryptPassword(
        event.entity.password,
        event.entity.salt,
      );
    }
  }

  beforeUpdate(event: UpdateEvent<UserEntity>): void {
    if (event.entity.password) {
      event.entity.salt = UtilsProvider.generateRandomString(6);
      event.entity.password = UtilsProvider.encryptPassword(
        event.entity.password,
        event.entity.salt,
      );
    }
  }
}
