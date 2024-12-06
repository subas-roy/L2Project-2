import express, { NextFunction, Request, Response } from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();

const shenaBahani = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.body);
  next();
};

router.post('/create-student', shenaBahani, UserControllers.createStudent);

export const UserRoutes = router;
