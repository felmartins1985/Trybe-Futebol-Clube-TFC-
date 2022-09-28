import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import UserService from '../services/user.service';

const JWT_SECRET = 'algo_super_secreto';
interface IToken {
  email: string;
}
interface NewRequest extends Request {
  userId?: number,
}
export default async (req: NewRequest, _res: Response, next: NextFunction) => {
  try {
    const { authorization: token } = req.headers;
    if (!token || token.length === 0) {
      return next({ code: 401, message: 'Token not found' });
    }
    const validateToken: IToken = verify(token, JWT_SECRET) as IToken;
    const service = new UserService();
    const user = await service.getUserById(validateToken.id);
    if (user.username !== validateToken.username) {
      next({ code: 401, message: 'Invalid token' });
    }
    req.userId = user.id;
    next();
  } catch (err) {
    next({ code: 401, message: 'Invalid token' });
  }
};
