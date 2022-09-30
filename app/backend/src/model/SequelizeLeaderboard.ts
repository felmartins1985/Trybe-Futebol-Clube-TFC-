import Team from '../database/models/TeamModel';
import Match from '../database/models/MatchModel';

abstract class SequelizeLeaderboard {
  protected _model = Team;

  async getAll() {
    const team = await this._model.findAll({
      include: [
        { model: Match, as: 'matchesHome', where: { inProgress: 0 } },
      ],
    });
    return team;
  }
}

export default SequelizeLeaderboard;
