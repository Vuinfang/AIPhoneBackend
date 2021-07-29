import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Post,
  Put,
  Query, ValidationPipe
} from '@nestjs/common';
import { PhoneService } from './phone.service';
import { AddPhoneDto } from './dto/add-phone.dto';
import { PhoneEntity } from './phone.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PhoneResponseDto } from './dto/phone-response.dto';
import { UpdatePhoneDto } from './dto/update-phone.dto';
import { PhonesPageOptionsDto } from './dto/phones-page-options.dto';
import { PageDto } from '../../common/constants';
import { UsersPageOptionsDto } from '../../core/user/dto';
import { UserResponseDto } from '../../core/auth/dto';
@ApiTags('phone')
@Controller('phone')
export class PhoneController {
  constructor(private readonly phoneService: PhoneService) {}

  // /**
  //  * Create the new phone
  //  * @param phone
  //  */
  // @ApiOperation({ summary: 'For create phone info' })
  // @ApiResponse({
  //   status: HttpStatus.CREATED,
  //   // type: AddPhoneDto,
  //   // status: 201,
  //   type: PhoneEntity,
  //   description: 'Success',
  // })
  // @ApiResponse({
  //   status: HttpStatus.BAD_REQUEST,
  //   type: PhoneEntity,
  //   description: 'data format error',
  // })
  // @Post('create')
  // async create(phone: AddPhoneDto): Promise<PhoneEntity> {
  //   return this.phoneService.create(phone);
  // }

  /**
   * Find all phone info
   */
  @ApiOperation({ summary: 'Find all phone info' })
  @ApiResponse({
    status: 201,
    type: PhoneResponseDto,
    description: 'Success',
  })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: 'The data format is incorrect',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not found',
  })
  @Get('getPhones')
  async getPhones(
    @Query(new ValidationPipe({ transform: true }))
    pageOptionsDto: UsersPageOptionsDto,
  ): Promise<PageDto<PhoneResponseDto>> {
    return await this.phoneService.getPhones(pageOptionsDto);
  }

  /**
   * Find phone by id
   * @param id
   */
  @ApiOperation({ summary: 'Find phone by id' })
  @ApiResponse({
    status: 201,
    type: PhoneResponseDto,
    description: 'Success',
  })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: 'The data format is incorrect',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not found',
  })
  @Get('findOneById')
  async findOneById(@Query('id') id: string): Promise<PhoneEntity> {
    return await this.phoneService.findOneById(id);
  }

  /**
   * Add a new phone
   * @param phone
   */
  @ApiOperation({ summary: 'Add a new phone' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: PhoneResponseDto,
    description: 'Success',
  })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: 'The data format is incorrect',
  })
  @Post('save')
  async save(@Body() phone: AddPhoneDto): Promise<AddPhoneDto> {
    return await this.phoneService.save(phone);
  }

  /**
   * Delete a phone
   * @param id
   */
  @ApiOperation({ summary: 'Delete a phone' })
  @ApiResponse({
    status: HttpStatus.ACCEPTED,
    type: PhoneResponseDto,
    description: 'Success',
  })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: 'The data format is incorrect',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not found',
  })
  @Delete('deleteById')
  async deleteById(@Query('id') id: string): Promise<PhoneEntity> {
    return await this.phoneService.deleteById(id);
  }

  /**
   * Update phone info
   * @param phone
   */
  @ApiOperation({ summary: 'Update phone info' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: PhoneResponseDto,
    description: 'Success',
  })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: 'The data format is incorrect',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not found',
  })
  @Put('update')
  async update(@Body() phone: UpdatePhoneDto): Promise<any> {
    return await this.phoneService.update(phone);
  }

  // /**
  //  * Find phone by keywords
  //  * @param pageOptionsDto
  //  */
  // @ApiOperation({ summary: 'Find phone by keywords' })
  // @ApiResponse({
  //   status: HttpStatus.FOUND,
  //   type: PhoneEntity,
  //   description: 'Success',
  // })
  // @ApiResponse({
  //   status: HttpStatus.BAD_REQUEST,
  //   type: PhoneEntity,
  //   description: 'data format error',
  // })
  // @ApiResponse({
  //   status: HttpStatus.NOT_FOUND,
  //   type: PhoneEntity,
  //   description: 'Not found',
  // })
  // @Get('getPhones')
  // async getPhones(
  //   @Query(new ValidationPipe({ transform: true }))
  //   pageOptionsDto: PhonesPageOptionsDto,
  // ): Promise<PageDto<PhoneResponseDto>> {
  //   return await this.phoneService.getPhones(pageOptionsDto);
  // }
}
