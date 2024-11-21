import User from '../models/user.model';
import { UserType } from '../interface/user.registration.types';
export const saveNewUser = async (user: UserType) => {
  const newUser = new User(user);
  await newUser.save();
};
