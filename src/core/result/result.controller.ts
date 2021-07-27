import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ResultService } from './result.service';
import {
  ApiHeader,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RolesGuard } from '../../common/guards';
import { JwtAuthGuard } from '../../common/guards';
import { Roles } from '../../common/decorators';
import { AuthUser } from '../../common/decorators';
import { ResultEntity } from './result.entity';
import { ResultResponseDto } from './dto/result-response.dto';
import { HttpRequestService } from '../../shared';
import { AdminRoleEnum } from '../../common/constants';
@ApiTags('Result')
@Controller('result')
export class ResultController {
  constructor(
    private readonly resultService: ResultService,
    private readonly httpRequestService: HttpRequestService,
  ) {}
  /***
   * get result details by id
   * @param id
   */
  @ApiOperation({ summary: 'find one result' })
  @ApiResponse({
    type: ResultResponseDto,
    status: HttpStatus.OK,
    description: 'Success',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Invalid result id',
  })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Forbidden resource - no access',
  })
  @ApiHeader({
    name: 'authorization',
    required: true,
    description: 'need token',
  })
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(AdminRoleEnum.ADMIN)
  @Get('findOne')
  async findOneById(@Query('id') id: string): Promise<ResultResponseDto> {
    const result = await this.resultService.findOneById(parseInt(id));
    // console.log(result);
    if (result) {
      return result;
    } else {
      throw new NotFoundException('Invalid result id');
    }
  }

  /***
   * delete a result by id
   * @param id
   */
  @ApiOperation({ summary: 'Delete one result' })
  @ApiResponse({ status: HttpStatus.OK, description: 'success' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'result id not exist',
  })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Forbidden resource - no access',
  })
  @ApiHeader({
    name: 'authorization',
    required: true,
    description: 'Need token',
  })
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(AdminRoleEnum.ADMIN)
  @Delete('delete')
  async deleteOneResultById(@AuthUser('id') id: number): Promise<void> {
    const res = await this.resultService.deleteById(id);
    if (res.affected === 0) {
      throw new NotFoundException('Invalid result id');
    }
  }

  /***
   * Get all result of one user
   * @param email
   * @param page
   * @param amount
   */
  @ApiOperation({ summary: 'Get all result of one user' })
  @ApiResponse({
    type: [ResultResponseDto],
    status: HttpStatus.OK,
    description: 'success',
  })
  // @ApiResponse({ status: 404, description: 'result email not exist' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Forbidden resource - no access',
  })
  // @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @ApiHeader({
    name: 'authorization',
    required: true,
    description: 'need token',
  })
  @ApiQuery({
    name: 'page',
    description: 'page',
  })
  @ApiQuery({
    name: 'amount',
    description: 'amount',
  })
  // @Roles(UserRoleEnum.ADMIN)
  @Get('findAllByEmail')
  async findAllByEmail(
    @AuthUser('email') email: string,
    @Query('page') page: string,
    @Query('amount') amount: string,
  ): Promise<ResultResponseDto[]> {
    return await this.resultService.findAllByEmail(
      email,
      parseInt(page),
      parseInt(amount),
    );
  }

  @ApiOperation({ summary: 'update one result' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'success' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'failed' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Forbidden resource - no access',
  })
  @ApiHeader({
    name: 'authorization',
    required: true,
    description: 'need token',
  })
  @UseGuards(JwtAuthGuard)
  @Put('update')
  async update(
    @Body() result: ResultEntity,
    @AuthUser('email') email: string,
  ): Promise<any> {
    if (result.email) {
      result.email = email;
    }
    const res = await this.resultService.update(email, result);
    if (res.affected === 0) {
      throw new NotFoundException('Invalid result id');
    }
  }
  @ApiOperation({ summary: 'save one result' })
  @ApiResponse({
    type: ResultResponseDto,
    status: HttpStatus.CREATED,
    description: 'success',
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'failed' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Forbidden resource - no access',
  })
  @ApiHeader({
    name: 'authorization',
    required: true,
    description: 'need token',
  })
  @UseGuards(JwtAuthGuard)
  @Post('save')
  async save(@Body() result: ResultEntity): Promise<ResultResponseDto> {
    return await this.resultService.save(result);
  }

  @ApiOperation({ summary: 'Search result from number' })
  @ApiResponse({
    type: ResultResponseDto,
    status: HttpStatus.CREATED,
    description: 'success',
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Failed' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  // @UseGuards(JwtAuthGuard)
  @Get('search')
  async search(@Query('keyword') keyword: string) {
    // const res = await lastValueFrom(
    //   this.httpService.get('http://localhost:3000/result/test'),
    // );
    const res = await this.httpRequestService.httpGetRequest(
      'http://localhost:3000/result/test',
    );
    // const result = await lastValueFrom(res).then((resp) => {
    //   return resp;
    // });
    console.log(res);
    return res;
  }

  @Post('test')
  async test() {
    return { key: 'haha' };
  }
}
