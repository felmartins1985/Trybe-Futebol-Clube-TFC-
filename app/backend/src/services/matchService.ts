// import ITeam from '../interfaces/ITeam';

import IMatch from '../interfaces/IMatch';
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

  public async postMatch(body:IMatch) {
    const match = await this.matchesModel.postMatch(body);
    const { homeTeam, awayTeam } = match;
    if (homeTeam === awayTeam) {
      return { code: 401, message: 'It is not possible to create a match with two equal teams' };
    }
    if (!match) {
      return { code: 404, message: 'No match found' };
    }
    return { code: 201, data: match };
  }

  public async patchMatch(id:number) {
    const body = await this.matchesModel.patchMatch(id);
    if (!body) {
      return { code: 404, message: 'No match found' };
    }
    return { code: 200, data: 'Finished' };
  }
  // public async findTeam(id:number) {
  //   const team = await this.teamModel.findTeam(id);
  //   if (!team) {
  //     return { code: 404, message: 'No team found' };
  //   }
  //   return { code: 200, data: team };
  // }
}
