import { Role } from '../models/Roles.model';
import { RoleType } from '../interface/roles.types';
import mongoose, { Types } from 'mongoose';

export const getRoleId = async (role: string): Promise<Types.ObjectId> => {
  const existingRole = await Role.findOne<RoleType>({ role });
  return existingRole!._id as Types.ObjectId;
};
