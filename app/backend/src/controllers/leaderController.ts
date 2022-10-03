import { Request, Response } from 'express';
// import ITeam from '../interfaces/ITeam';
import LeaderService from '../services/leaderService';

export default class LeaderController {
  private service: LeaderService;

  constructor() {
    this.service = new LeaderService();
  }

  public async getAllHome(req: Request, res: Response) {
    const team = await this.service.getAllHome();
    if (team.message) {
      return res.status(team.code).json({ message: team.message });
    }
    return res.status(team.code).json(team.data);
  }

  public async getAllAway(req: Request, res: Response) {
    const team = await this.service.getAllAway();
    if (team.message) {
      return res.status(team.code).json({ message: team.message });
    }
    return res.status(team.code).json(team.data);
  }

  public async getAll(req: Request, res: Response) {
    const team = await this.service.getAll();
    if (team.message) {
      return res.status(team.code).json({ message: team.message });
    }
    return res.status(team.code).json(team.data);
  }
}
