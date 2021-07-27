import { ApiPropertyOptional } from '@nestjs/swagger';
import { AbstractDto } from '../../../common/constants';
import type { UserEntity } from '../user.entity';

export class UserDto extends AbstractDto {
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

  // @ApiPropertyOptional({ enum: UserRoleEnum })
  // role: UserRoleEnum;

  @ApiPropertyOptional({
    description: 'For stripe',
  })
  customerId: string;

  @ApiPropertyOptional()
  avatar: string;

  // @ApiPropertyOptional()
  // phone: string;

  @ApiPropertyOptional()
  isActive: boolean;

  constructor(user: UserEntity, options?: Partial<{ isActive: boolean }>) {
    super(user);
    this.fullName = user.fullName;
    // this.role = user.role;
    this.email = user.email;
    this.customerId = user.customerId;
    this.avatar = user.avatar;
    this.isActive = options?.isActive;
  }
}
