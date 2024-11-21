import mongoose from 'mongoose';
import { RoleType } from '../interface/roles.types';
const { Schema } = mongoose;

const roleSchema = new Schema<RoleType>({
  role: { type: String, required: true, unique: true },
  permissions: { type: [String], default: [] },
});

export const Role = mongoose.model('Role', roleSchema);
