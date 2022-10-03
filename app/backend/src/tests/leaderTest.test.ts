import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import * as leaderMock from './mocks/leaderMock';
import { app } from '../app';

import LeaderModel from '../model/LeaderModel';

// import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Rota /leaderBoard', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  // let chaiHttpResponse: Response;
  describe('Rota Get /leaderboard/home sucesso', () => {
    before(async () => {
      sinon
        .stub(LeaderModel.prototype, "getAllHome")
        .resolves(leaderMock.arrayTeamHome);
    });
  
    after(() => {
      (LeaderModel.prototype.getAllHome as sinon.SinonStub).restore();
    });
  
  
    it('Retorna os times com sucesso', async () => {
      const result = await chai.request(app).get('/leaderboard/home');
      // console.log(result.status, result.body);
      expect(result.status).to.be.equal(200);  
      expect(result.body).to.be.an('array');
      expect(result.body).to.deep.equal(leaderMock.arrayBoardHome);
    });
  })
  describe('Rota Get /leaderboard/away ', () => {
    before(async () => {
      sinon
        .stub(LeaderModel.prototype, "getAllAway")
        .resolves(leaderMock.arrayTeamAway);
    });
  
    after(() => {
      (LeaderModel.prototype.getAllAway as sinon.SinonStub).restore();
    });
  
  
    it('Retorna os times com sucesso', async () => {
      const result = await chai.request(app).get('/leaderboard/away');
      // console.log(result.status, result.body);
      expect(result.status).to.be.equal(200);  
      expect(result.body).to.be.an('array');
      expect(result.body).to.deep.equal(leaderMock.arrayBoardAway);
    });
  })
  describe('Rota Get /leaderboard ', () => {
    before(async () => {
      sinon
        .stub(LeaderModel.prototype, "getAllHome")
        .resolves(leaderMock.arrayTeamHome);
      sinon
        .stub(LeaderModel.prototype, "getAllAway")
        .resolves(leaderMock.arrayTeamAway);
    });
  
    after(() => {
      (LeaderModel.prototype.getAllHome as sinon.SinonStub).restore();
      (LeaderModel.prototype.getAllAway as sinon.SinonStub).restore();
    });
  
  
    it('Retorna os times com sucesso', async () => {
      const result = await chai.request(app).get('/leaderboard');
      // console.log(result.status, result.body);
      expect(result.status).to.be.equal(200);  
      expect(result.body).to.be.an('array');
      expect(result.body).to.deep.equal(leaderMock.arrayBoard);
    });
  })
});