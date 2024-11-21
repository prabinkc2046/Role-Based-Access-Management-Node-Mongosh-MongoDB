import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../interface/error.types';

export const catchError = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err) {
    const { status, name, message } = err;
    const errorStatus = status || 500;
    const errorName = name || 'UnknownError';
    const errorMessage = message || 'Unknown error';
    console.log(
      `Error status:\t${errorStatus} ErrorName: ${errorName}'\t Info:${errorMessage}`
    );

    res.status(errorStatus).json({ error: errorMessage });
  }
};
