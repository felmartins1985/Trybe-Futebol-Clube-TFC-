// import { ILogin } from '../interfaces/ILogin';
import TeamModel from '../database/models/TeamModel';
import ITeam from '../interfaces/ITeam';

abstract class SequelizeModelTeam {
  protected _model = TeamModel;

  public async getAll(): Promise<ITeam[] | null > {
    return this._model.findAll();
  }

  public async findTeam(id:number): Promise<ITeam | null> {
    return this._model.findByPk(id);
  }
}

export default SequelizeModelTeam;
