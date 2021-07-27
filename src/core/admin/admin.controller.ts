import {
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserResponseDto } from '../auth/dto';
import { AuthUser } from '../../common/decorators';
import { AdminRoleEnum, UserRoleEnum } from '../../common/constants';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from '../../common/decorators/http.decorators';
import { PageDto } from '../../common/constants';
import { UsersPageOptionsDto } from '../user/dto';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly userService: UserService) {}
  /**
   * get user details by id
   * @param id
   */
  @ApiOperation({ summary: 'Find one user, admin only' })
  @ApiResponse({ status: 200, description: 'user exist' })
  @ApiResponse({ status: 404, description: 'Invalid user id' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden resource - no access' })
  @ApiHeader({
    name: 'authorization',
    required: true,
    description: 'need token',
  })
  // @UseGuards(RolesGuard)
  // @UseGuards(JwtAuthGuard)
  // @Roles(UserRoleEnum.ADMIN)
  @Auth(AdminRoleEnum.ADMIN)
  @Get('findOne')
  async findOneUserById(@Query('id') id: string): Promise<UserResponseDto> {
    const user = await this.userService.findOneById(id);
    if (user) {
      return user;
    } else {
      throw new NotFoundException('Invalid user id');
    }
  }

  /**
   * delete a user by id
   * @param id
   */
  @ApiOperation({ summary: 'delete one user' })
  @ApiResponse({ status: HttpStatus.OK, description: 'success' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'user id not exist',
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
  // @UseGuards(RolesGuard)
  // @UseGuards(JwtAuthGuard)
  // @Roles(UserRoleEnum.ADMIN)
  @Auth(AdminRoleEnum.ADMIN)
  @Delete('delete')
  async deleteOneUserById(@AuthUser('id') id: string): Promise<void> {
    const res = await this.userService.deleteById(id);
    if (res.affected === 0) {
      throw new NotFoundException('Invalid user id');
    }
  }

  // @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Find all users' })
  @ApiResponse({ status: HttpStatus.OK, description: 'success' })
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
  // @UseGuards(RolesGuard)
  // @UseGuards(JwtAuthGuard)
  // @Roles(UserRoleEnum.ADMIN)
  @Auth(AdminRoleEnum.ADMIN)
  @Get('findAll')
  getUsers(
    @Query(new ValidationPipe({ transform: true }))
    pageOptionsDto: UsersPageOptionsDto,
  ): Promise<PageDto<UserResponseDto>> {
    return this.userService.getUsers(pageOptionsDto);
  }

  // @Get(':id')
  // @Auth(UserRoleEnum.ADMIN)
  // @ApiResponse({
  //   status: HttpStatus.OK,
  //   description: 'Get users list',
  //   type: UserDto,
  // })
  // getUser(@UUIDParam('id') userId: string): Promise<UserDto> {
  //   return this.userService.getUser(userId);
  // }
}
