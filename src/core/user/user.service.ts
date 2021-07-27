import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { SignUpDto } from '../auth/dto';
import { UserResponseDto } from '../auth/dto';
import { ValidatorService } from '../../shared/services/validator.service';
import { AwsS3Service } from '../../shared/services/aws-s3.service';
import type { FindConditions } from 'typeorm';
import { IFile } from '../../common/interfaces';
import { FileNotImageException } from '../../common/exceptions';
import { UserDto, UsersPageOptionsDto } from './dto';
import { PageDto } from '../../common/constants';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    public readonly validatorService: ValidatorService,
    public readonly awsS3Service: AwsS3Service,
  ) {}
  async create(user: SignUpDto): Promise<UserEntity> {
    return this.userRepository.create(user);
  }
  // find all users
  async findAllUser(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }
  // find a specific user by user id
  async findOneById(id: string): Promise<UserResponseDto> {
    return await this.userRepository.findOne({ where: { id } });
  }
  // find part user detail by user id for verification
  async findEmailById(id: string): Promise<UserEntity> {
    return await this.userRepository.findOne({
      where: { id },
      select: ['email'],
    });
  }
  // find a specific user by user email
  async findOneByEmail(email: string): Promise<UserEntity> {
    return await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .addSelect('user.salt')
      .where('user.email = :email', { email })
      .getOne();
  }
  // add a new user
  async save(user: UserEntity): Promise<UserResponseDto> {
    const { password, salt, ...res } = await this.userRepository.save(user);
    return res;
  }
  // delete a user using user id
  async deleteById(id: string): Promise<any> {
    return await this.userRepository.delete(id);
  }
  // update user information by id
  async update(id: string, user: SignUpDto): Promise<any> {
    return await this.userRepository.update({ id }, user);
  }

  /**
   * Find single user
   */
  findOne(findData: FindConditions<UserEntity>): Promise<UserEntity> {
    return this.userRepository.findOne(findData);
  }
  async findByUsernameOrEmailOrMobile(
    options: Partial<{ username: string; email: string; mobile: string }>,
  ): Promise<UserEntity | undefined> {
    const queryBuilder = this.userRepository.createQueryBuilder('user');

    if (options.email) {
      queryBuilder.orWhere('user.email = :email', {
        email: options.email,
      });
    }
    if (options.username) {
      queryBuilder.orWhere('user.username = :username', {
        username: options.username,
      });
    }
    if (options.mobile) {
      queryBuilder.orWhere('user.mobile = :mobile', {
        mobile: options.mobile,
      });
    }

    return queryBuilder.getOne();
  }

  async createUser(
    SignUpDto: SignUpDto,
    file: IFile,
  ): Promise<UserResponseDto> {
    const tempResult = await this.findByUsernameOrEmailOrMobile({
      email: SignUpDto.email,
    });
    if (tempResult) {
      throw new BadRequestException('The email already in use.');
    }
    const user = this.userRepository.create(SignUpDto);
    if (file && !this.validatorService.isImage(file.mimetype)) {
      throw new FileNotImageException();
    }
    if (file) {
      user.avatar = await this.awsS3Service.uploadImage(file);
    }
    const { password, salt, ...res } = await this.userRepository.save(user);
    return res;
  }

  async getUsers(
    pageOptionsDto: UsersPageOptionsDto,
  ): Promise<PageDto<UserResponseDto>> {
    const queryBuilder = this.userRepository.createQueryBuilder('user');
    const { items, pageMetaDto } = await queryBuilder
      .searchByString(pageOptionsDto.q, ['first_name'])
      .paginate(pageOptionsDto);

    return items.toPageDto(pageMetaDto);
  }

  async getUser(userId: string): Promise<UserDto> {
    const queryBuilder = this.userRepository.createQueryBuilder('user');

    queryBuilder.where('user.id = :userId', { userId });

    const userEntity = await queryBuilder.getOne();

    return userEntity.toDto();
  }
}
