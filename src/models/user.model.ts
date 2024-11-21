import mongoose from 'mongoose';
import { UserDocumentType } from '../interface/user.registration.types';

const { Schema } = mongoose;

const userSchema = new Schema<UserDocumentType>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: Schema.Types.ObjectId, required: true, ref: 'Role' },
  createdDate: { type: Date, default: Date.now() },
  updatedDate: { type: Date, default: Date.now() },
});

const User = mongoose.model<UserDocumentType>('User', userSchema);

export default User;
