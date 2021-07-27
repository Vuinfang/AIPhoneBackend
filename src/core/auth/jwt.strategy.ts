import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ApiConfigService } from '../../shared';
import { UserService } from '../user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    public readonly userService: UserService,
    public readonly configService: ApiConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.authConfig.jwtSecret,
    });
  }

  // JWT验证 - Step 4: 被守卫调用
  async validate(payload: any) {
    const user = await this.userService.findEmailById(payload.id);
    if (user && user.email === payload.email) {
      return {
        id: payload.id,
        email: payload.email,
        exp: payload.exp,
        role: payload.role,
      };
    } else {
      throw new UnauthorizedException();
    }
    // return {
    //   id: payload.id,
    //   email: payload.email,
    //   exp: payload.exp,
    //   role: payload.role,
    // };
  }
}
