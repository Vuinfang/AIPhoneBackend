import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { SignUpDto, UserResponseDto } from '../auth/dto';
import { AuthUser } from '../../common/decorators';
import { JwtAuthGuard } from '../../common/guards';
import {
  ApiHeader,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'update one user' })
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
    @Body() user: SignUpDto,
    @AuthUser('id') id: string,
  ): Promise<any> {
    const res = await this.userService.update(id, user);
    if (res.affected === 0) {
      throw new NotFoundException('Invalid user id');
    }
  }
  @Get('me')
  @ApiOperation({ summary: 'Current user info' })
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiHeader({
    name: 'authorization',
    required: true,
    description: 'need token',
  })
  @ApiOkResponse({ type: UserResponseDto, description: 'Current user info' })
  async getCurrentUser(@AuthUser('id') id: string): Promise<UserResponseDto> {
    return await this.userService.findOneById(id);
  }

  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not Exist' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Exist' })
  @Get('checkExist')
  @ApiQuery({
    name: 'email',
    description: 'email',
  })
  @ApiQuery({
    name: 'username',
    description: 'username',
  })
  @ApiQuery({
    name: 'mobile',
    description: 'mobile',
  })
  async checkExist(
    @Query()
    options: Partial<{ username: string; email: string; mobile: string }>,
  ): Promise<string> {
    const result = await this.userService.findByUsernameOrEmailOrMobile(
      options,
    );
    if (result) {
      return 'Exist';
    } else {
      throw new NotFoundException('Not Exist');
    }
  }
}
