import { Router, Response, Request, NextFunction } from 'express';
const router = Router();

router.get('/profile', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ message: 'User profile fetched' });
  return;
});

export default router;
