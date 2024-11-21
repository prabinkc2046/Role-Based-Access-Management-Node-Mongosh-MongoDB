import { Router } from 'express';
import registerRoleController from '../../controllers/role/addNewRole.controller';
import { validateRolePermissionData } from '../../middlewares/role/validateRolePermissionData.middleware';

const router = Router();

router.post('/addrole', validateRolePermissionData, registerRoleController);

export default router;
