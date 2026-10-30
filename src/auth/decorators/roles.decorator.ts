import { SetMetadata } from '@nestjs/common';
import { Role } from '../../generated/prisma/enums.js';
export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
