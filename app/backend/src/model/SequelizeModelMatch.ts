// import { ILogin } from '../interfaces/ILogin';
import IMatch from '../interfaces/IMatch';
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

  public async postMatch(body: IMatch) {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = body;
    const newMatch = {
      homeTeam,
      awayTeam,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: true,
    };
    const findId = await this._model.create(newMatch);
    const { id } = findId;
    const matchComplete = { id, ...newMatch };
    return matchComplete;
  }

  public async patchMatch(id: number) {
    const match = await this._model.update({ inProgress: false }, { where: { id } });
    return match;
  }
}

export default SequelizeModelMatch;
