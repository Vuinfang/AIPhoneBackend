import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Trim } from '../../../common/decorators/transforms.decorator';
export class SignUpDto {
  @ApiProperty({
    description: 'Email',
  })
  @IsEmail()
  @IsNotEmpty({ message: 'email cannot be empty' })
  @IsString({ message: 'the value must be a string' })
  @Trim()
  email: string;

  @ApiProperty({
    description: 'fullName',
  })
  @IsString()
  // @IsOptional()
  @IsNotEmpty()
  @Trim()
  fullName: string;

  @ApiProperty({
    description: 'avatar',
  })
  @IsString()
  @IsOptional()
  // @IsNotEmpty()
  @Trim()
  avatar: string;

  @IsNotEmpty({ message: 'password cannot be empty' })
  @MinLength(8)
  @MaxLength(20)
  @ApiProperty({
    description: 'Password, length: 8-20',
  })
  password: string;
}
