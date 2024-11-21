import { allowedRoles } from '../config/permissionByRoles';
import { allowedRoutesByRoles } from '../config/permissionByRoles';

import { Role } from '../models/Roles.model';
import { RoleType } from '../interface/roles.types';
import { ObjectId } from 'mongoose';

export const isRoleAllowed = async (roleId: ObjectId, path: string) => {
  // get role document by role id
  const role = await Role.findById(roleId);
  console.log('role document is', role);
  if (!role) {
    return false;
  }

  if (
    Array.isArray(role.permissions || (role && role.permissions.includes()))
  ) {
    return false;
  }
  return true;
};
