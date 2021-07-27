import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResultEntity } from './result.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ResultService {
  constructor(
    @InjectRepository(ResultEntity)
    private resultRepository: Repository<ResultEntity>,
  ) {}
  // find a specific result by result id
  async findOneById(id: number): Promise<ResultEntity> {
    return await this.resultRepository.findOne({ where: { id } });
  }
  // find all record related to one user
  async findAllByEmail(
    email: string,
    page: number,
    amount: number,
  ): Promise<ResultEntity[]> {
    page = (page - 1) * amount;
    return await this.resultRepository.find();
    // return await this.resultRepository.find({
    //   where: { email },
    //   skip: page,
    //   take: amount,
    //   order: {
    //     createdAt: 'DESC',
    //   },
    // });
  }
  // add a new result
  async save(result: ResultEntity): Promise<ResultEntity> {
    return await this.resultRepository.save(result);
  }
  // delete a result using result id
  async deleteById(id: number): Promise<any> {
    return await this.resultRepository.delete(id);
  }
  // update result information by id
  async update(email: string, result: ResultEntity): Promise<any> {
    return await this.resultRepository.update({ email }, result);
  }
}
