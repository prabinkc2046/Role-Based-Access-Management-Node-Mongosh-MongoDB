import { Request, Response, NextFunction } from 'express';
import { PermissionFormType } from '../../interface/rolePermission.types';

export const validateRolePermissionData = (
  req: Request<{}, {}, PermissionFormType>,
  res: Response,
  next: NextFunction
) => {
  // grab
  const { role, permissions } = req.body;
  //   check role is valid

  if (!role || typeof role !== 'string') {
    res.status(400).json({ message: 'role is not valid type' });
    return;
  }

  //check permissions is an array
  if (!Array.isArray(permissions) || permissions.length === 0) {
    res.status(400).json({ message: 'Permissions are not provided' });
    return;
  }
  next();
};
