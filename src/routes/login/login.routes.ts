import { Router } from 'express';
import { validateLoginData } from '../../middlewares/login/validateLoginData.middleware';
import loginUserController from '../../controllers/login/loginUser.controller';
const router = Router();

router.post('/login', validateLoginData, loginUserController);

export default router;
