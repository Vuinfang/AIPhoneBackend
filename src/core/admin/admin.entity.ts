import { Column, Entity } from 'typeorm';
import { AbstractEntity, AdminRoleEnum } from '../../common/constants';
import { UserRoleEnum } from '../../common/constants';
import { AdminDto } from './dto';

@Entity('admin')
export class AdminEntity extends AbstractEntity<AdminDto> {
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

  @Column({ default: AdminRoleEnum.ADMIN })
  role: AdminRoleEnum;

  dtoClass = AdminDto;
}
