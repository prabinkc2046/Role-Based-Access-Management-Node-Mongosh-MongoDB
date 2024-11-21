import jwt from 'jsonwebtoken';
import { LoginData } from '../interface/user.login.types';
import { UserDocumentType } from '../interface/user.registration.types';
import { DecodedToken } from '../interface/decodedToken.types';
const ACCESS_TOKEN_KEY = process.env.JWT_ACCESS_KEY!;

export const createAccessToken = async (user: UserDocumentType) => {
  const encodedUserInfo: DecodedToken = {
    username: user.username,
    roleId: user.role,
  };
  return jwt.sign(encodedUserInfo, ACCESS_TOKEN_KEY, { expiresIn: '15min' });
};
