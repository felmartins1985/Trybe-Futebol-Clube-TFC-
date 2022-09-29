import * as express from 'express';
import error from './middlewares/error';
import LoginController from './controllers/loginController';
import TeamController from './controllers/teamController';
import loginMiddleware from './middlewares/loginMiddleware';
import auth from './middlewares/auth';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    const loginController = new LoginController();
    const teamController = new TeamController();
    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
    this.app.post('/login', loginMiddleware, loginController.create.bind(loginController));
    this.app.get('/login/validate', auth, loginController.validateToken);
    this.app.get('/teams', teamController.getAllTeams.bind(teamController));
    this.app.get('/teams/:id', teamController.findTeam.bind(teamController));
    this.app.use(error);
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
