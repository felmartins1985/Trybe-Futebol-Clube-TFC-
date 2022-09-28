import BcryptService from './utils/BcryptService';
import { ILogin } from '../interfaces/ILogin';
import createToken from './utils/createToken';
import UserModel from '../model/UserModel';

export default class LoginService {
  constructor(private userModel = new UserModel()) {}

  public async login(user: ILogin) {
    const foundUser = await this.userModel.findOne(user);
    if (!foundUser) {
      return { code: 401, message: 'email not exists' };
    }
    const isPasswordCorrect = BcryptService.compare(foundUser.password, user.password);
    if (!isPasswordCorrect) {
      return { code: 401, message: 'password invalid' };
    }
    const token = createToken(user.email);
    return { code: 200, data: token };
  }
}
