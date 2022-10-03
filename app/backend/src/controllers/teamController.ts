import { Request, Response } from 'express';
// import ITeam from '../interfaces/ITeam';
import TeamService from '../services/teamService';

export default class TeamController {
  private service: TeamService;

  constructor() {
    this.service = new TeamService();
  }

  public async getAllTeams(req: Request, res: Response) {
    const team = await this.service.getAllTeams();
    if (team.message) {
      return res.status(team.code).json({ message: team.message });
    }
    return res.status(team.code).json(team.data);
  }

  public async findTeam(req: Request, res: Response) {
    const { id } = req.params;
    const team = await this.service.findTeam(Number(id));
    if (team.message) {
      return res.status(team.code).json({ message: team.message });
    }
    return res.status(team.code).json(team.data);
  }
}
