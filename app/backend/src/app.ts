import * as express from 'express';
import error from './middlewares/error';
import LoginController from './controllers/loginController';
import TeamController from './controllers/teamController';
import MatchController from './controllers/matchController';
import LeaderController from './controllers/leaderController';
import loginMiddleware from './middlewares/loginMiddleware';
import auth from './middlewares/auth';

class App {
  public app: express.Express;
  public loginController = new LoginController();
  public teamController = new TeamController();
  public matchController = new MatchController();
  public leaderController = new LeaderController();
  constructor() {
    this.app = express();

    this.config();
    this.routes();
    this.app.use(error);
  }

  routes():void {
    this.app.get('/', (req, res) => res.json({ ok: true }));
    this.app.post('/login', loginMiddleware, this.loginController.create
      .bind(this.loginController));
    this.app.get('/login/validate', auth, this.loginController.validateToken);
    this.app.get('/teams', this.teamController.getAllTeams.bind(this.teamController));
    this.app.get('/teams/:id', this.teamController.findTeam.bind(this.teamController));
    this.app.get('/matches', this.matchController.getAllMatches.bind(this.matchController));
    this.app.post('/matches', auth, this.matchController.postMatch.bind(this.matchController));
    this.app.patch('/matches/:id', this.matchController.patchMatchGoals.bind(this.matchController));
    this.app.patch('/matches/:id/finish', this.matchController.patchMatch
      .bind(this.matchController));
    this.app.get('/leaderboard/home', this.leaderController.getAllHome.bind(this.leaderController));
    this.app.get('/leaderboard/away', this.leaderController.getAllAway.bind(this.leaderController));
    this.app.get('/leaderboard', this.leaderController.getAll.bind(this.leaderController));
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
