import { Request, Response, NextFunction } from 'express';
import { LoginData } from '../../interface/user.login.types';
import { isValidEmail } from '../../utility/verifyEmailFormat';

export const validateLoginData = (
  req: Request<{}, {}, LoginData>,
  res: Response,
  next: NextFunction
) => {
  const { username, email, password } = req.body;

  //    check that either username or email is provided
  if (!username && !email) {
    res.status(400).json({ message: 'Either Username or email is required' });
    return;
  }

  //   check that password is provided
  if (!password) {
    res.status(400).json({ message: 'Password is not provided' });
    return;
  }

  if (
    typeof password !== 'string' ||
    (email && typeof email !== 'string') ||
    (username && typeof username !== 'string')
  ) {
    res.status(400).json({ message: 'Please provide the data in string form' });
    return;
  }

  next();
};
