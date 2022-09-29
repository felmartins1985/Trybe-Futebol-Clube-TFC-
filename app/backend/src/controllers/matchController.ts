import { Request, Response } from 'express';
// import ITeam from '../interfaces/ITeam';
import MatchService from '../services/matchService';

export default class MatchController {
  private service: MatchService;

  constructor() {
    this.service = new MatchService();
  }

  public async getAllMatches(req: Request, res: Response) {
    const team = await this.service.getAllMatches();
    if (team.message) {
      return res.status(team.code).json({ message: team.message });
    }
    return res.status(team.code).json(team.data);
  }

  public async postMatch(req: Request, res: Response) {
    const result = await this.service.postMatch(req.body);
    if (result.message) {
      return res.status(result.code).json({ message: result.message });
    }
    return res.status(result.code).json(result.data);
  }

  public async patchMatch(req: Request, res: Response) {
    const { id } = req.params;
    const result = await this.service.patchMatch(Number(id));
    if (result.message) {
      return res.status(result.code).json({ message: result.message });
    }
    return res.status(result.code).json({ message: result.data });
  }
  // public async findTeam(req: Request, res: Response) {
  //   const { id } = req.params;
  //   const team = await this.service.findTeam(Number(id));
  //   return res.status(team.code).json(team.data);
  // }
}
