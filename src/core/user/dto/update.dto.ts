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
export class UpdateDto {
  @ApiProperty({
    description: 'Email',
  })
  @IsEmail()
  @IsOptional()
  @IsNotEmpty({ message: 'email cannot be empty' })
  @IsString({ message: 'the value must be a string' })
  @Trim()
  email: string;

  @ApiProperty({
    description: 'fullName',
  })
  @IsString({ message: 'the value must be a string' })
  @IsOptional()
  @IsNotEmpty({ message: 'email cannot be empty' })
  @Trim()
  fullName: string;

  @IsNotEmpty({ message: 'password cannot be empty' })
  @MinLength(8)
  @IsOptional()
  @MaxLength(20)
  @ApiProperty({
    description: 'Password, length: 8-20',
  })
  password: string;
}
