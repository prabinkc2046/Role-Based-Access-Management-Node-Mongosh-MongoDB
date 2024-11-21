import { Response, Request } from 'express';

export const getAccessToken = (req: Request): string | undefined => {
  const authToken = req.headers?.authorization;
  if (!authToken || !authToken.startsWith('Bearer ')) {
    return undefined;
  }

  const accessToken = authToken.split(' ')[1];
  return accessToken;
};
