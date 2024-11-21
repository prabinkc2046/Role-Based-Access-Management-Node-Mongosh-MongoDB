import { Request, Response, NextFunction } from 'express';
import { RegistrationFormType } from '../../interface/user.registration.types';
import { isRoleExists } from '../../utility/isRoleExists';
import {
  hasRequiredSymbol,
  hasAtLeastOneNumber,
} from '../../utility/validatePassword';
import { isValidEmail } from '../../utility/verifyEmailFormat';

export const validateUserRegistration = async (
  req: Request<{}, {}, RegistrationFormType>,
  res: Response,
  next: NextFunction
) => {
  const { username, email, password, role } = req.body;

  if (!username || !email || !password || !role) {
    res.status(400).json({ message: 'Information provided is not complete' });
    return;
  }

  //   ensures name, username, email and password are strings
  if (
    typeof username !== 'string' ||
    typeof email !== 'string' ||
    typeof password !== 'string' ||
    typeof role !== 'string'
  ) {
    res.status(400).json({ message: 'Invalid data' });
    return;
  }

  //   password is minimum 6 characters long
  if (password.length < 6) {
    res
      .status(400)
      .json({ message: 'Password needs to be atleast 6 characters long' });
    return;
  }

  //   password needs to include one of these symbols !, @, #, $, %, ^, &, *
  if (!hasRequiredSymbol(password)) {
    res.status(400).json({
      message:
        'password needs to include one of these symbols !, @, #, $, %, ^, &, *',
    });
    return;
  }

  //   ensure has at least one number
  if (!hasAtLeastOneNumber(password)) {
    res.status(400).json({
      message: 'password needs atleast one number',
    });
    return;
  }

  // ensure email include @
  if (!isValidEmail(email)) {
    res.status(400).json({
      message: 'Email is not a valid email',
    });
    return;
  }

  const existingRole = await isRoleExists(role);
  // check provided role exists in our allowed roles
  if (!existingRole) {
    res.status(400).json({
      message: 'Role does not exist',
    });
    return;
  }

  next();
};
