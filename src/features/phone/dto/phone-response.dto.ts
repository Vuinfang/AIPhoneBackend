import { ApiProperty } from '@nestjs/swagger';
import { AbstractDto } from '../../../common/constants';

export class PhoneResponseDto extends AbstractDto {
  @ApiProperty({
    description: 'name',
  })
  name: string;
}
