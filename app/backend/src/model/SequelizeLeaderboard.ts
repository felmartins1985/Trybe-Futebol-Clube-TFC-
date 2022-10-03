import Team from '../database/models/TeamModel';
import Match from '../database/models/MatchModel';
import { ITeamAway, ITeamHome } from '../interfaces/ITeamHome';

abstract class SequelizeLeaderboard {
  protected _model = Team;

  async getAllHome() {
    const team = await this._model.findAll({
      include: [
        { model: Match, as: 'matchesHome', where: { inProgress: 0 } },
      ],
    }) as unknown as ITeamHome[];
    return team;
  }

  async getAllAway() {
    const team = await this._model.findAll({
      include: [
        { model: Match, as: 'matchesAway', where: { inProgress: 0 } },
      ],
    }) as unknown as ITeamAway[];
    return team;
  }
}

export default SequelizeLeaderboard;
