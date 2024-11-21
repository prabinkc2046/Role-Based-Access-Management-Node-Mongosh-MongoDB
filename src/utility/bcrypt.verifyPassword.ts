import bcrypt from 'bcrypt';

import { LoginData } from '../interface/user.login.types';
export const verifyPassword = async (password: string, user: LoginData) => {
  const hashedPassword = user.password;
  const matched = await bcrypt.compare(password, hashedPassword);
  return matched;
};
