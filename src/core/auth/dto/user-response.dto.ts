import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { AbstractDto } from '../../../common/constants/dto';

export class UserResponseDto extends AbstractDto {
  @ApiProperty({
    description: 'Email',
  })
  @IsEmail()
  @IsNotEmpty({ message: 'email cannot be empty' })
  @IsString({ message: 'the value must be a string' })
  email: string;

  @ApiProperty({
    description: 'fullName',
  })
  fullName: string;

  @ApiProperty({
    description: 'stripe customerId',
  })
  customerId: string;

  @ApiProperty({
    description: 'avatar',
  })
  avatar: string;

  @ApiProperty({
    description: 'whether active',
  })
  isActive: boolean;

  // @ApiProperty({
  //   description: '',
  // })
  // role: string;
}
