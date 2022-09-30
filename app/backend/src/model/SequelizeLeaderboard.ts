import Team from '../database/models/TeamModel';
import Match from '../database/models/MatchModel';

abstract class SequelizeLeaderboard {
  protected _model = Team;

  async getAllHome() {
    const team = await this._model.findAll({
      include: [
        { model: Match, as: 'matchesHome', where: { inProgress: 0 } },
      ],
    });
    return team;
  }

  async getAllAway() {
    const team = await this._model.findAll({
      include: [
        { model: Match, as: 'matchesAway', where: { inProgress: 0 } },
      ],
    });
    return team;
  }
}

export default SequelizeLeaderboard;
