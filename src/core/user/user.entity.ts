import { Column, Entity } from 'typeorm';
import { AbstractEntity } from '../../common/constants';
import { UserDto } from './dto';
import { UserRoleEnum } from '../../common/constants';

@Entity('user')
export class UserEntity extends AbstractEntity<UserDto> {
  @Column({ unique: true })
  email: string;

  @Column({ length: 80 })
  fullName: string;

  @Column({ default: null })
  customerId: string;

  @Column({ select: false })
  password: string;

  @Column({ select: false })
  salt: string;

  @Column({ default: null })
  avatar: string;

  @Column({ default: false })
  isActive: boolean;

  // @Column({ default: UserRoleEnum.USER })
  // role: UserRoleEnum;

  dtoClass = UserDto;
}
