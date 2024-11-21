import { Request, Response, NextFunction } from 'express';
import { Role } from '../../models/Roles.model';

const registerRoleController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // grab role and permission
    // {role:'admin', permission:[/admin/manage-all]}
    const { role, permissions } = req.body;

    // Check if role already exists then we can add the same role
    const existingRole = await Role.findOne({ role: role });

    if (existingRole) {
      res.status(400).json({
        message: `Role ${role} already exist. So can not duplicate it`,
      });
      return;
    }
    // define a document here
    const newRoleDocument = new Role({
      role: role,
      permissions: permissions,
    });

    await newRoleDocument.save();
    res.status(201).json({ message: `new Role ${role} is added` });
  } catch (error) {
    console.error('Failed to register new role');
    res.status(500).json({ message: 'Failed to register new role' });
  }
};

export default registerRoleController;
