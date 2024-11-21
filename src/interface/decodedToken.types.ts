import mongoose, { Types } from 'mongoose';

export interface DecodedToken {
  username: string;
  roleId: Types.ObjectId;
  iat?: number;
  exp?: number;
}
