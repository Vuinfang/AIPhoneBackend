import { Column, Entity } from 'typeorm';
import { AbstractEntity } from '../../common/constants';
import { PhoneResponseDto } from './dto/phone-response.dto';

@Entity('phone')
export class PhoneEntity extends AbstractEntity<PhoneResponseDto> {
  @Column({ length: 80 })
  name: string;
  @Column()
  price: number;
  @Column()
  description: string;
  @Column({ default: null })
  discount: string;
  @Column()
  stock: number;

  dtoClass = PhoneResponseDto;
}
