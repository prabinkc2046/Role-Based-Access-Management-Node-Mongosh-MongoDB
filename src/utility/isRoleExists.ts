import { allowedRoles } from '../config/permissionByRoles';
import { Role } from '../models/Roles.model';
import { RoleType } from '../interface/roles.types';

export const isRoleExists = async (role: string) => {
  const existingRole = await Role.findOne({ role: role });
  return !!existingRole;
};
