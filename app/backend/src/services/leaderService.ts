import LeaderModel from '../model/LeaderModel';
import { calculateLeaderboard, sortLeaderboard } from './utils/leaderUtils';

export default class LeaderService {
  private sequelizeLeader = new LeaderModel();

  public async getAll() {
    const matches = await this.sequelizeLeader.getAll();
    if (!matches) {
      return { code: 404, message: 'No matches found' };
    }
    const leaderboard = matches.map(calculateLeaderboard);
    const sortedLeaderboard = sortLeaderboard(leaderboard);
    return { code: 200, data: sortedLeaderboard };
  }
}
