// import ITeam from '../interfaces/ITeam';

import MatchModel from '../model/MatchModel';

export default class TeamService {
  constructor(private matchesModel = new MatchModel()) {}

  public async getAllMatches() {
    const matches = await this.matchesModel.getAll();
    if (!matches) {
      return { code: 404, message: 'No matches found' };
    }
    return { code: 200, data: matches };
  }

  // public async findTeam(id:number) {
  //   const team = await this.teamModel.findTeam(id);
  //   if (!team) {
  //     return { code: 404, message: 'No team found' };
  //   }
  //   return { code: 200, data: team };
  // }
}
