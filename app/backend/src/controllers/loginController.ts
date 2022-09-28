import { NextFunction, Request, Response } from 'express';
import { ILogin } from '../interfaces/ILogin';
import LoginService from '../services/loginService';

interface NewRequest extends Request {
  userRole?: string,
}
export default class LoginController {
  private service: LoginService;

  constructor() {
    this.service = new LoginService();
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    const user = req.body as ILogin;
    const { code, data, message } = await this.service.login(user);
    if (message) {
      return next({ code, message });
    }
    return res.status(code).json({ token: data });
  }

  validateToken = async (req: Request, res: Response) => {
    const { userRole } = req as NewRequest;
    return res.status(200).json({ role: userRole });
  };
}
