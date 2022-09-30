import { Request, Response } from 'express';
// import ITeam from '../interfaces/ITeam';
import LeaderService from '../services/leaderService';

export default class LeaderController {
  private service: LeaderService;

  constructor() {
    this.service = new LeaderService();
  }

  public async getAll(req: Request, res: Response) {
    const team = await this.service.getAll();
    if (team.message) {
      return res.status(team.code).json({ message: team.message });
    }
    return res.status(team.code).json(team.data);
  }
}
