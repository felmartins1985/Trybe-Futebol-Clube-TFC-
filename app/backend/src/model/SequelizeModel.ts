import { ILogin } from '../interfaces/ILogin';
import UserModel from '../database/models/UserModel';
import { IUser } from '../interfaces/IUser';

abstract class SequelizeModel {
  protected _model = UserModel;

  // public async create(creationAtributes: CreateOptions<T>): Promise<T> {
  //   return this._model.create(creationAtributes);
  // }

  public async findOne(user: ILogin): Promise<IUser | null > {
    return this._model.findOne({ where: { email: user.email } });
  }
}

export default SequelizeModel;
