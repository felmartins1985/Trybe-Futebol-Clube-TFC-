import { Request, Response, NextFunction } from 'express';
import { ILogin } from '../interfaces/ILogin';

export default (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body as ILogin;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!(email.match(emailRegex))) {
    return next({
      code: 400,
      message: 'O "email" deve ter o formato "email@email.com"',
    });
  }
  if (!password || password.length <= 6) {
    return next({ code: 400, message: '"password" is invalid' });
  }
  next();
};
