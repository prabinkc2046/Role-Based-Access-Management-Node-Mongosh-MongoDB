import mongoose, { Document, ObjectId } from 'mongoose';

export interface RoleType extends Document {
  role: string; // like admin, teacher, student
  permissions: string[]; // like ['read', 'write']
}
