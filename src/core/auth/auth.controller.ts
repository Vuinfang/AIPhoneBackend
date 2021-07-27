import {
  Body,
  Controller,
  HttpStatus,
  Post,
  UploadedFile,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { LoginPayloadDto, SignInDto, SignUpDto, UserResponseDto } from './dto';
import { AdminRoleEnum, UserRoleEnum } from '../../common/constants/enum';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IFile } from '../../common/interfaces';
import { ApiFile } from '../../common/decorators/swagger.schema';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({ summary: 'for user sign up' })
  @ApiResponse({ type: UserResponseDto, status: 201, description: 'success' })
  @ApiResponse({ status: 201, description: 'success' })
  @ApiResponse({ status: 500, description: 'failed, system error' })
  @ApiResponse({ status: 400, description: 'data format error' })
  @ApiFile({ name: 'avatar' })
  @ApiBody({
    description: '',
    type: SignUpDto,
  })
  @Post('signUp')
  async signUp(
    @Body() signUpDto: SignUpDto,
    @UploadedFile() file: IFile,
  ): Promise<UserResponseDto> {
    return await this.userService.createUser(signUpDto, file);
    // user.salt = makeSalt();
    // user.password = encryptPassword(user.password, user.salt);
    // return await this.userService.save(user);
  }
  @ApiOperation({ summary: 'for user sign in' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: LoginPayloadDto,
    description: 'Success',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Data format error',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Invalid username or password',
  })
  @Post('signIn')
  async signIn(@Body() signInDto: SignInDto): Promise<LoginPayloadDto> {
    const userEntity = await this.authService.validateUser(signInDto);
    const token = await this.authService.createToken(
      userEntity,
      UserRoleEnum.USER,
    );
    return new LoginPayloadDto(userEntity.toDto(), token);
  }
  @ApiOperation({ summary: 'for Admin sign in' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: LoginPayloadDto,
    description: 'Success',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Data format error',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Invalid username or password',
  })
  @Post('adminSignIn')
  async adminSignIn(@Body() signInDto: SignInDto): Promise<LoginPayloadDto> {
    const userEntity = await this.authService.validateAdmin(signInDto);
    const token = await this.authService.createToken(
      userEntity,
      AdminRoleEnum.ADMIN,
    );
    return new LoginPayloadDto(userEntity.toDto(), token);
  }
}
