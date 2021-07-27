import { ApiPropertyOptional } from '@nestjs/swagger';

import { AdminRoleEnum } from '../../../common/constants';
import { AbstractDto } from '../../../common/constants';
import { AdminEntity } from '../admin.entity';

export class AdminDto extends AbstractDto {
  @ApiPropertyOptional()
  fullName: string;

  @ApiPropertyOptional()
  email: string;

  @ApiPropertyOptional()
  password: string;

  @ApiPropertyOptional()
  salt: string;
  // @ApiPropertyOptional()
  // lastName: string;
  //
  // @ApiPropertyOptional()
  // username: string;

  @ApiPropertyOptional({ enum: AdminRoleEnum })
  role: AdminRoleEnum;

  @ApiPropertyOptional({
    description: 'For stripe',
  })
  customerId: string;

  @ApiPropertyOptional()
  avatar: string;

  // @ApiPropertyOptional()
  // phone: string;

  constructor(admin: AdminEntity) {
    super(admin);
    this.fullName = admin.fullName;
    this.role = admin.role;
    this.email = admin.email;
    this.customerId = admin.customerId;
    this.avatar = admin.avatar;
  }
}
