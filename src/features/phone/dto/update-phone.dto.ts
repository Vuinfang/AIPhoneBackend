import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';
import { Trim } from '../../../common/decorators/transforms.decorator';
import { AbstractDto } from '../../../common/constants';

export class UpdatePhoneDto extends PickType(AbstractDto, ['id'] as const) {
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
