import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AdminRoleEnum } from '../constants';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    //Get req
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (user.role === AdminRoleEnum.GOD) {
      return true;
    }
    return user ? roles.includes(user.role) : false;
  }
}
