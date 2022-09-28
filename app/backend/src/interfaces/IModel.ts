import { CreateOptions, Model } from 'sequelize';

interface IModel<T extends Model> {
  create(obj: CreateOptions<T>): Promise<T>,
  findOne(obj: CreateOptions<T>): Promise<T>,
}

export default IModel;
