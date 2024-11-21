import { Router } from 'express';
import { registerUser } from '../controllers/registration/registerUser.controller';
import { validateUserRegistration } from '../middlewares/registration/validateUserRegistration.middleware';

const router = Router();

// register new user
router.post('/register', validateUserRegistration, registerUser);
export default router;
