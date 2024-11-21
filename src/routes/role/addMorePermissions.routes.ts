import { Router } from 'express';
import { validateRolePermissionData } from '../../middlewares/role/validateRolePermissionData.middleware';
import addMorePermissionsController from '../../controllers/role/addMorePermissions.controller';
const router = Router();

router.post(
  '/addpermissions',
  validateRolePermissionData,
  addMorePermissionsController
);

export default router;
