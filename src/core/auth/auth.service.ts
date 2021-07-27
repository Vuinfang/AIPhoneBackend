import { Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto';
import { ApiConfigService } from '../../shared';
import { AdminRoleEnum, UserRoleEnum } from '../../common/constants';
import { TokenPayloadDto } from './dto';
import { UserEntity } from '../user/user.entity';
import { UserDto } from '../user/dto';
import { AdminService } from '../admin/admin.service';
import { UtilsProvider } from '../../common/providers';

@Injectable()
export class AuthService {
  constructor(
    public readonly configService: ApiConfigService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly adminService: AdminService,
  ) {}
  async validateUser(signInDto: SignInDto): Promise<any> {
    const user = await this.userService.findOneByEmail(signInDto.email);
    if (!user) {
      throw new NotFoundException('Invalid email or password');
    }
    const { password, salt } = user;
    const hashedPassword = UtilsProvider.encryptPassword(
      signInDto.password,
      salt,
    );
    console.log(user);
    if (hashedPassword === password) {
      return user;
    } else {
      throw new NotFoundException('Invalid email or password');
    }
  }
  async validateAdmin(signInDto: SignInDto): Promise<any> {
    const user = await this.adminService.findOneByEmail(signInDto.email);
    if (!user) {
      throw new NotFoundException('Invalid email or password');
    }
    const { password, salt, ...rest } = user;
    const hashedPassword = UtilsProvider.encryptPassword(
      signInDto.password,
      salt,
    );
    if (hashedPassword === password) {
      return rest;
    } else {
      throw new NotFoundException('Invalid email or password');
    }
  }
  async createToken(
    user: UserEntity | UserDto,
    role: UserRoleEnum | AdminRoleEnum,
  ): Promise<TokenPayloadDto> {
    const payload = {
      email: user.email,
      id: user.id,
      role,
    };
    return new TokenPayloadDto({
      expiresIn:
        this.configService.authConfig.jwtExpirationTime +
        Math.floor(Date.now() / 1000),
      accessToken: await this.jwtService.signAsync(payload),
    });
  }

  // // JWT identity - Step 3: generate jwt token
  // async certificate(
  //   user: UserResponseDto,
  //   role: UserRoleEnum,
  // ): Promise<SignInResponseDto> {
  //   const payload = {
  //     email: user.email,
  //     id: user.id,
  //     role,
  //   };
  //   const token = await this.jwtService.sign(payload);
  //   return { token, user };
  // }
}
