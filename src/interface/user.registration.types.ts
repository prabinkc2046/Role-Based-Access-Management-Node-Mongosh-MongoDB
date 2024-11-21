import mongoose from 'mongoose';
import { Document } from 'mongoose';

export interface UserDocumentType extends Document {
  username: string;
  email: string;
  password: string;
  role: mongoose.Types.ObjectId;
  createdDate?: Date;
  updatedDate?: Date;
}

export interface RegistrationFormType {
  username: string;
  email: string;
  password: string;
  role: string;
}
