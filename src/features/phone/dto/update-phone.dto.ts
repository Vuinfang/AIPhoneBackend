import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { Trim } from '../../../common/decorators/transforms.decorator';

export class UpdatePhoneDto {
  @ApiProperty({
    description: 'Name',
  })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @Trim()
  name: string;
}
