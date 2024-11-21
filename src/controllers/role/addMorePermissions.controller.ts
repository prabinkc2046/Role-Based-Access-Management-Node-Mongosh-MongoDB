import { Request, Response, NextFunction } from 'express';
import { PermissionFormType } from '../../interface/rolePermission.types';
import { Role } from '../../models/Roles.model';

const addMorePermissionsController = async (
  req: Request<{}, {}, PermissionFormType>,
  res: Response,
  next: NextFunction
) => {
  try {
    // grab data from request body
    const { role, permissions } = req.body;

    // before adding more permissions, check if these permision already exist for this role
    // avoid duplicating the permission for a given error

    const roleWithExistingPermission = await Role.findOne({
      role: role,
      permissions: { $in: permissions },
    });

    if (roleWithExistingPermission) {
      res.status(400).json({
        messsage: `Duplicate permissions, Existings permissions for role ${role} are: ${roleWithExistingPermission.permissions}`,
      });
      return;
    }

    // add new permissions to this role
    const updatedPermission = await Role.findOneAndUpdate(
      {
        role: role,
      },
      { $addToSet: { permissions: { $each: permissions } } },
      { new: true }
    );

    if (!updatedPermission) {
      res.status(400).json({ message: 'Role is not found' });
      return;
    }

    res.status(201).json({ message: `New permission is added for ${role}` });
  } catch (error) {
    console.error('Failed to add more permission');
    res.status(500).json({ message: 'Failed to add more permission' });
  }
};

export default addMorePermissionsController;
