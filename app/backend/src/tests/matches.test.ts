import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');
import * as matchesMock from './mocks/matchesMock';
import { app } from '../app';
import oneUser from './mocks/userMock';

import MatchModel from '../model/MatchModel';
import UserModel from '../model/UserModel';
import TeamModel from '../model/TeamModel';
// import { Response } from 'superagent';

chai.use(chaiHttp);
const auth= 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImlhdCI6MTY2NDUwNDc4MCwiZXhwIjoxNjY0NTkxMTgwfQ.lYN2ImWYl-ejFGAMEClZzcFS6I3Bx4PX2lfS47v9rus'
const { expect } = chai;

describe('Rota /matches', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  // let chaiHttpResponse: Response;
  describe('Rota Get /matches sucesso', () => {
    before(async () => {
      sinon
        .stub(MatchModel.prototype, "getAll")
        .resolves(matchesMock.mockMatches);
    });
  
    after(() => {
      (MatchModel.prototype.getAll as sinon.SinonStub).restore();
    });
  
  
    it('Retorna os jogos com sucesso', async () => {
      const result = await chai.request(app).get('/matches');
      // console.log(result.status, result.body);
      expect(result.status).to.be.equal(200);  
      expect(result.body).to.be.an('array');
      expect(result.body).to.deep.equal(matchesMock.mockMatches);
    });
  })
  describe('Rota Get /matches falha', () => {
    before(async () => {
      sinon
        .stub(MatchModel.prototype, "getAll")
        .resolves(null);
    });
  
    after(() => {
      (MatchModel.prototype.getAll as sinon.SinonStub).restore();
    });
  
  
    it('Retorna os jogos com sucesso', async () => {
      const result = await chai.request(app).get('/matches');
      // console.log(result.status, result.body);
      expect(result.status).to.be.equal(404);  
      expect(result.body).to.be.an('object');
      expect(result.body).to.deep.equal({ message: 'No matches found' });
    });
  });
  describe('rota POST /matches',()=>{
    describe('rota com sucesso', () => {
      before(() => {
        sinon.stub(jwt, 'verify').callsFake(() => {
          return Promise.resolve({ success: 'Token is valid' });
    });
      
      sinon.stub(UserModel.prototype,'findOne').resolves(oneUser)
      sinon.stub(TeamModel.prototype, 'findTeam')
        .onFirstCall()
        .resolves({ id: 3, teamName: "Botafogo" })
        .onSecondCall()
        .resolves({ id: 5, teamName: "Cruzeiro" });
        
      })
      sinon.stub(MatchModel.prototype, "postMatch").resolves({
        id: 3,
        homeTeam: 3,
        awayTeam: 5,
        homeTeamGoals: 3,
        awayTeamGoals: 1,
        inProgress: true
      });
      after(() => {
        (jwt.verify as sinon.SinonStub).restore();
        (UserModel.prototype.findOne as sinon.SinonStub).restore();
        (TeamModel.prototype.findTeam as sinon.SinonStub).restore();
        (MatchModel.prototype.postMatch as sinon.SinonStub).restore();
      })
      it('retorna o jogo criado com sucesso',async ()=>{
        const result = await chai.request(app).post('/matches').set('authorization', auth)
        .send({
          homeTeam: "Botafogo",
          awayTeam: "Cruzeiro",
          homeTeamGoals: 3,
          awayTeamGoals: 1,
          inProgress: true
        });
        expect(result.status).to.be.equal(201);
        expect(result.body).to.be.an('object');
        expect(result.body).to.deep.equal({
          id: 3,
          homeTeam: 3,
          awayTeam: 5,
          homeTeamGoals: 3,
          awayTeamGoals: 1,
          inProgress: true
        });
      })
    })
  })
  describe('rota Patch/matches', ()=>{
    describe('rota com sucesso', ()=>{
      before(()=>{
        sinon.stub(MatchModel.prototype, 'patchMatch').resolves();
      })
      after(()=>{
        (MatchModel.prototype.patchMatch as sinon.SinonStub).restore();
      })
      it('retorna o jogo atualizado com sucesso', async ()=>{
        const result = await chai.request(app).patch('/matches/1/finish');

        expect(result.status).to.be.equal(200);
        expect(result.body).to.have.property('message');
        expect(result.body.message).to.be.equal('Finished');
      })
    })
  })
});