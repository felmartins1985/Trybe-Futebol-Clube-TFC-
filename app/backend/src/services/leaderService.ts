import LeaderModel from '../model/LeaderModel';
import { calculateLeaderboardH, sortLeaderboardH } from './utils/leaderUtilsHome';
import { calculateLeaderboardA, sortLeaderboardA } from './utils/leaderUtilsAway';
import { calculateLeaderboard, sortLeaderboard } from './utils/leaderUtilsMain';

const noMatches = 'No matches found';
export default class LeaderService {
  private sequelizeLeader = new LeaderModel();

  public async getAllHome() {
    const matches = await this.sequelizeLeader.getAllHome();
    if (!matches) {
      return { code: 404, message: noMatches };
    }
    const leaderboard = matches.map(calculateLeaderboardH);
    const sortedLeaderboard = sortLeaderboardH(leaderboard);
    return { code: 200, data: sortedLeaderboard };
  }

  public async getAllAway() {
    const matches = await this.sequelizeLeader.getAllAway();
    if (!matches) {
      return { code: 404, message: noMatches };
    }
    const leaderboard = matches.map(calculateLeaderboardA);
    const sortedLeaderboard = sortLeaderboardA(leaderboard);
    return { code: 200, data: sortedLeaderboard };
  }

  public async getAll() {
    const { data: matchesHome } = await this.getAllHome();
    const { data: matchesAway } = await this.getAllAway();
    if (!matchesHome || !matchesAway) {
      return { code: 404, message: noMatches };
    }
    const leaderboard = calculateLeaderboard(matchesHome, matchesAway);
    const sortedLeaderboard = sortLeaderboard(leaderboard);
    return { code: 200, data: sortedLeaderboard };
  }
}
