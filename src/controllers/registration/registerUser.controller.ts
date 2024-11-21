import { Request, Response, NextFunction } from 'express';
import { RegistrationFormType } from '../../interface/user.registration.types';
import { UserDocumentType } from '../../interface/user.registration.types';
import { isUserExists } from '../../utility/isUserExists';
import { getRoleId } from '../../utility/getRoleId';
import { hashPassword } from '../../utility/bcrypt.hashPassword';
import { saveNewUser } from '../../utility/saveNewUser';
import { CustomError } from '../../interface/error.types';
import { RoleType } from '../../interface/roles.types';
import User from '../../models/user.model';

export const registerUser = async (
  req: Request<{}, {}, RegistrationFormType>,
  res: Response,
  next: NextFunction
) => {
  try {
    // validate register user data by middle ware

    // grab request body assuming middleware has already validated data
    const { username, password, email, role } = req.body;

    // Does user name already exist?
    const isExistingUser = await isUserExists(username, email);

    if (isExistingUser) {
      res.status(400).json({ message: 'Username or email already taken. ' });
      return;
    }

    //   hash the plain password
    const hashedPassword = await hashPassword(password);

    const roleId = await getRoleId(role);

    //   Save user info in the database
    const newUser = new User({
      email,
      password: hashedPassword,
      username,
      role: roleId,
    });

    await newUser.save();

    res.status(201).json({ message: 'User is registered successfully' });
  } catch (error) {
    const errorDetails: CustomError = {
      name: 'RegistrationError',
      status: 500,
      message: `Error during user registration process: ${error}`,
    };
    next(errorDetails);
  }
};
