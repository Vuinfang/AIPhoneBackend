import { ApiProperty } from '@nestjs/swagger';
import { AbstractDto } from '../../../common/constants';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Trim } from '../../../common/decorators/transforms.decorator';

export class PhoneResponseDto extends AbstractDto {
  @ApiProperty({
    description: 'Name',
  })
  @IsString({ message: 'the value must be a string' })
  @IsNotEmpty({ message: 'the value cannot be empty' })
  @Trim()
  name: string;

  @ApiProperty({
    description: 'Price',
  })
  @IsNumber()
  @IsNotEmpty({ message: 'the value cannot be empty' })
  price: number;

  @ApiProperty({
    description: 'Description',
  })
  @IsString({ message: 'the value must be a string' })
  @IsNotEmpty({ message: 'the value cannot be empty' })
  description: string;

  @ApiProperty({
    description: 'Discount',
  })
  @IsString({ message: 'the value must be a string' })
  discount: string;

  @ApiProperty({
    description: 'Stock',
  })
  @IsNumber()
  @IsNotEmpty({ message: 'the value cannot be empty' })
  stock: number;
}
