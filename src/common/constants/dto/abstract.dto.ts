import { ApiProperty } from '@nestjs/swagger';

import type { AbstractEntity } from '../entity/abstract.entity';
import { IsString } from 'class-validator';

export class AbstractDto {
  @IsString({ message: 'the value must be a string' })
  @ApiProperty()
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor(entity: AbstractEntity) {
    this.id = entity.id;
    this.createdAt = entity.createdAt;
    this.updatedAt = entity.updatedAt;
  }
}
