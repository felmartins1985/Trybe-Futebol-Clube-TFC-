// import ITeam from '../interfaces/ITeam';
import TeamModel from '../model/TeamModel';
import IMatch from '../interfaces/IMatch';
import MatchModel from '../model/MatchModel';

export default class TeamService {
  private sequelizeTeam = new TeamModel();
  constructor(private matchesModel = new MatchModel()) {}

  public async getAllMatches() {
    const matches = await this.matchesModel.getAll();
    if (!matches) {
      return { code: 404, message: 'No matches found' };
    }
    return { code: 200, data: matches };
  }

  public async postMatch(body:IMatch) {
    const { homeTeam, awayTeam } = body;
    const home = await this.sequelizeTeam.findTeam(homeTeam);
    const away = await this.sequelizeTeam.findTeam(awayTeam);
    if (!home || !away) {
      return { code: 404, message: 'There is no team with such id!' };
    }
    if (homeTeam === awayTeam) {
      return { code: 401, message: 'It is not possible to create a match with two equal teams' };
    }
    const match = await this.matchesModel.postMatch(body);
    return { code: 201, data: match };
  }

  public async patchMatch(id:number) {
    const body = await this.matchesModel.patchMatch(id);
    if (!body) {
      return { code: 404, message: 'No match found' };
    }
    return { code: 200, data: 'Finished' };
  }

  public async patchMatchGoals(id: number, teamHome: number, teamAway: number) {
    const patchGoals = await this.matchesModel.patchMatchGoals(id, teamHome, teamAway);
    if (!patchGoals) {
      return { code: 404, message: 'Its not possible to update' };
    }
    return { code: 200, data: patchGoals };
  }
  // public async findTeam(id:number) {
  //   const team = await this.teamModel.findTeam(id);
  //   if (!team) {
  //     return { code: 404, message: 'No team found' };
  //   }
  //   return { code: 200, data: team };
  // }
}
