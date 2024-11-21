import { Request, Response, NextFunction } from 'express';
import { getAccessToken } from '../utility/getAccessToken';
import jwt from 'jsonwebtoken';
import { CustomError } from '../interface/error.types';
import { DecodedToken } from '../interface/decodedToken.types';

const JWT_ACCESS_KEY = process.env.JWT_ACCESS_KEY!;

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // grab token
  const accessToken = getAccessToken(req);

  //   throw error if access token is not defined
  if (!accessToken) {
    res.status(403).json({ message: 'Token is either missing or invalid' });
    return;
  }

  try {
    const decodedUser = jwt.verify(accessToken, JWT_ACCESS_KEY) as DecodedToken;
    req.body = decodedUser;
    next();
  } catch (error) {
    const errorDetails: CustomError = {
      name: 'AuthorisationError',
      message: 'Failed to authorised',
      status: 400,
    };
    next(errorDetails);
  }
};
