import { Request, Response, NextFunction } from 'express';
import { DecodedToken } from '../interface/decodedToken.types';
import { Role } from '../models/Roles.model';

const verifyRoles = async (
  req: Request<{}, {}, DecodedToken>,
  res: Response,
  next: NextFunction
) => {
  // grab the role from the token
  const { roleId } = req.body;
  const path = req.path;

  // check role is not null or not undefined
  if (!roleId) {
    res.status(400).json({ message: 'Invalid Role' });
    return;
  }

  // use roleId to get permissions array for this roleId

  const roleDocument = await Role.findById(roleId);

  if (!roleDocument) {
    res.status(400).json({ message: 'Role is not found' });
    return;
  }

  const permissions = roleDocument.permissions;
  console.log('permission looks liek this', permissions);
  console.log('path looks like this', path);
  if (!permissions.includes(path)) {
    res.status(400).json({ message: 'Access denied' });
    return;
  }
  next();
};

export default verifyRoles;
