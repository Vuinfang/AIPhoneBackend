import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { AbstractDto } from '../../../common/constants';
import { ResultEntity } from '../result.entity';

export class ResultResponseDto extends AbstractDto {
  @ApiProperty({
    description: 'Email',
  })
  @IsEmail()
  @IsNotEmpty({ message: 'email cannot be empty' })
  @IsString({ message: 'the value must be a string' })
  email: string;

  @ApiProperty({
    description: 'name',
  })
  name: string;

  @ApiProperty({
    description: 'pdf file address',
  })
  fileAddress: string;

  @ApiProperty({
    description: 'receipt file address',
  })
  receiptAddress: string;

  @ApiProperty({
    description: 'search number',
  })
  searchNumber: string;

  @ApiProperty({
    description: 'certificate number',
  })
  certificate: string;

  constructor(result: ResultEntity) {
    super(result);
    this.email = result.email;
    this.name = result.name;
    this.certificate = result.certificate;
    this.fileAddress = result.fileAddress;
    this.receiptAddress = result.receiptAddress;
    this.searchNumber = result.searchNumber;
  }
}
