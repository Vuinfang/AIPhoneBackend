import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AbstractEntity } from '../../common/constants/entity/abstract.entity';
import { ResultResponseDto } from './dto/result-response.dto';

@Entity('result')
export class ResultEntity extends AbstractEntity<ResultResponseDto> {
  @Column()
  email: string;
  @Column()
  name: string;
  @Column()
  fileAddress: string;
  @Column()
  receiptAddress: string;
  @Column()
  searchNumber: string;
  @Column()
  certificate: string;

  dtoClass = ResultResponseDto;
}
