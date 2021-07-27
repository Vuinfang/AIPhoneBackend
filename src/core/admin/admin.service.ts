import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminEntity } from './admin.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminEntity)
    private adminRepository: Repository<AdminEntity>,
  ) {}
  async findOneByEmail(email: string): Promise<AdminEntity> {
    return await this.adminRepository
      .createQueryBuilder('admin')
      .addSelect('admin.password')
      .addSelect('admin.salt')
      .where('admin.email = :email', { email })
      .getOne();
  }
}
