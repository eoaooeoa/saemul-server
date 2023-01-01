import { SetMetadata } from '@nestjs/common';
import { Role } from '../enums/role.enum';

// @roles란 데코레이터
export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
