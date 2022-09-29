// import { ILogin } from '../interfaces/ILogin';
import MatchModel from '../database/models/MatchModel';
import TeamModel from '../database/models/TeamModel';

abstract class SequelizeModelMatch {
  protected _model = MatchModel;

  public async getAll(): Promise<MatchModel[] | null > {
    return this._model.findAll({ include: [
      { model: TeamModel, as: 'teamHome' },

      { model: TeamModel, as: 'teamAway' },
    ] });
  }
  // { model: User, as: ‘user’, attributes: { exclude: [‘password’] } },
  // public async findTeam(id:number): Promise<ITeam | null> {
  //   return this._model.findByPk(id);
  // }
}

export default SequelizeModelMatch;
