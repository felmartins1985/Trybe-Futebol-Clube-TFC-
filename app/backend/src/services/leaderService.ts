import LeaderModel from '../model/LeaderModel';
import { calculateLeaderboard, sortLeaderboard } from './utils/leaderUtilsHome';
import { calculateLeaderboardA, sortLeaderboardA } from './utils/leaderUtilsAway';

export default class LeaderService {
  private sequelizeLeader = new LeaderModel();

  public async getAllHome() {
    const matches = await this.sequelizeLeader.getAllHome();
    if (!matches) {
      return { code: 404, message: 'No matches found' };
    }
    const leaderboard = matches.map(calculateLeaderboard);
    const sortedLeaderboard = sortLeaderboard(leaderboard);
    return { code: 200, data: sortedLeaderboard };
  }

  public async getAllAway() {
    const matches = await this.sequelizeLeader.getAllAway();
    if (!matches) {
      return { code: 404, message: 'No matches found' };
    }
    const leaderboard = matches.map(calculateLeaderboardA);
    const sortedLeaderboard = sortLeaderboardA(leaderboard);
    return { code: 200, data: sortedLeaderboard };
  }
}
