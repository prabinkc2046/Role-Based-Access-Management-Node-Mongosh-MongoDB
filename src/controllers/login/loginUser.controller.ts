import { Request, Response, NextFunction } from 'express';
import { LoginData } from '../../interface/user.login.types';
import { isUserExists } from '../../utility/isUserExists';
import { verifyPassword } from '../../utility/bcrypt.verifyPassword';
import { createAccessToken } from '../../utility/jwt.createAccessToken';
import { CustomError } from '../../interface/error.types';

const loginUserController = async (
  req: Request<{}, {}, LoginData>,
  res: Response,
  next: NextFunction
) => {
  try {
    // parsing json data is already done by express.json()

    // validate login data is already taken care my middle ware validateLoginData

    // grab the request body
    const { username, email, password } = req.body;

    // Check if user is registered
    const existingUser = await isUserExists(username, email);

    // exit if user has not registered
    if (!existingUser) {
      res.status(400).json({ message: 'User not registered' });
      return;
    }

    //   verify the password matches
    const isVerified = await verifyPassword(password, existingUser);
    //   exit if password does not match
    if (!isVerified) {
      res
        .status(403)
        .json({ message: 'Unauthorised user. Password does not match' });

      return;
    }

    //   create an access token for a verfied user
    const accessToken = await createAccessToken(existingUser);

    if (!accessToken) {
      res.status(400).json({ message: 'New token could not be sent' });
      return;
    }

    console.log('new token', accessToken);

    res.status(200).json({ accessToken });
  } catch (error) {
    const errorDetails: CustomError = {
      name: 'LoginError',
      status: 500,
      message: `Error during login process: ${error}`,
    };
    next(errorDetails);
  }
};

export default loginUserController;
