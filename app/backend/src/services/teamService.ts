// import ITeam from '../interfaces/ITeam';

import TeamModel from '../model/TeamModel';

export default class TeamService {
  constructor(private teamModel = new TeamModel()) {}

  public async getAllTeams() {
    const teams = await this.teamModel.getAll();
    if (!teams) {
      return { code: 404, message: 'No teams found' };
    }
    return { code: 200, data: teams };
  }
}
