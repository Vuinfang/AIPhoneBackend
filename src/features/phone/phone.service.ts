import { Injectable } from '@nestjs/common';
import { ValidatorService } from '../../shared/services/validator.service';
import { AwsS3Service } from '../../shared/services/aws-s3.service';
import { PageDto } from '../../common/constants';
import { PhoneEntity } from './phone.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddPhoneDto } from './dto/add-phone.dto';
import { PhoneResponseDto } from './dto/phone-response.dto';
import { UpdatePhoneDto } from './dto/update-phone.dto';
import type { FindConditions } from 'typeorm';
import { PhonesPageOptionsDto } from './dto/phones-page-options.dto';

@Injectable()
export class PhoneService {
  constructor(
    @InjectRepository(PhoneEntity)
    private phoneRepository: Repository<PhoneEntity>,
    public readonly validatorService: ValidatorService,
    public readonly awsS3Service: AwsS3Service,
  ) {}
  async create(phone: AddPhoneDto): Promise<AddPhoneDto> {
    return this.phoneRepository.create(phone);
  }
  // find all phones
  async findAllPhone(): Promise<PhoneEntity[]> {
    return await this.phoneRepository.find();
  }
  // find a specific phone by phone id
  async findOneById(id: string): Promise<PhoneEntity> {
    return await this.phoneRepository.findOne({ where: { id } });
  }
  // add a new phone
  async save(phone: AddPhoneDto): Promise<PhoneEntity> {
    return await this.phoneRepository.save(phone);
  }
  // delete a phone using phone id
  async deleteById(id: string): Promise<any> {
    return await this.phoneRepository.delete(id);
  }
  // update phone information by id
  async update(phone: Partial<UpdatePhoneDto>): Promise<any> {
    return await this.phoneRepository.update({ id: phone.id }, phone);
  }

  // /**
  //  * Find single phone
  //  */
  // findOne(findData: FindConditions<PhoneEntity>): Promise<PhoneEntity> {
  //   return this.phoneRepository.findOne(findData);
  // }

  /**
   * Find phones with keywords
   * @param pageOptionsDto
   */
  async getPhones(
    pageOptionsDto: PhonesPageOptionsDto,
  ): Promise<PageDto<PhoneResponseDto>> {
    const queryBuilder = this.phoneRepository.createQueryBuilder('phone');
    console.log('adadf');
    const { items, pageMetaDto } = await queryBuilder
      .searchByString(pageOptionsDto.q, ['name', 'description'])
      .paginate(pageOptionsDto);

    return items.toPageDto(pageMetaDto);
  }
}
