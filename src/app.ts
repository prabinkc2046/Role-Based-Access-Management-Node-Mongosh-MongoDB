import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response, NextFunction } from 'express';
import userRegistrationRoute from './routes/register.routes';
import userLoginRoute from './routes/login/login.routes';
import { catchError } from './middlewares/catchError.middleware';
import { verifyToken } from './middlewares/verifyToken.middleware';
import addRoleRouter from './routes/role/addNewRole.router';
import addMorePermissionRoute from './routes/role/addMorePermissions.routes';
import verifyRoles from './middlewares/verifyRole';

const app = express();
app.use(express.json());

// routes

// register
app.use('/auth', userRegistrationRoute);

// login
app.use('/auth', userLoginRoute);

// add role
// => /roles/addrole
// only admin can do it
app.use('/roles', addRoleRouter);

// add more permissions
//  => /roles/addpermission
// only admin can do it
app.use('/roles', addMorePermissionRoute);

// apply middleware globally
app.use(verifyToken, verifyRoles);

app.get('/admin/manage-teachers', (req, res) => {
  res.json({ message: 'Teacher management portal accessed.' });
});

app.get('/principal/manage-students', (req, res) => {
  res.json({ message: 'Student management portal accessed.' });
});

app.get('/teacher/student-progress', (req, res) => {
  res.json({ message: 'Viewing student progress.' });
});

app.get('/student/my-progress', (req, res) => {
  res.json({ message: `Progress report for ${req.body.username}.` });
});

// catch all error and log
app.use(catchError);

export default app;
