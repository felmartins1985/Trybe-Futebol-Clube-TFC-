import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import TeamModel from '../model/TeamModel';

// import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Rota /team', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  // let chaiHttpResponse: Response;
  describe('Rota Get /team', () => {
    before(async () => {
      sinon
        .stub(TeamModel.prototype, "getAll")
        .resolves([
          {
            id:1,
            teamName: 'Bahia',
          },
          {
            id:2,
            teamName: 'Botafogo',
          }],
        );
    });
  
    after(() => {
      (TeamModel.prototype.getAll as sinon.SinonStub).restore();
    });
  
    // it('...', async () => {
    //   chaiHttpResponse = await chai
    //      .request(app)
    //      ...
  
    //   expect(...)
    // });
  
    it('Retorna os times com sucesso', async () => {
      const result = await chai.request(app).get('/teams')
      expect(result.status).to.be.equal(200);  
      expect(result.body).to.be.an('array');
    });  
  })
  describe('Rota Get /team', () => {
    before(async () => {
      sinon
        .stub(TeamModel.prototype, "getAll")
        .resolves(null);
    });
  
    after(() => {
      (TeamModel.prototype.getAll as sinon.SinonStub).restore();
    });
  
  
    it('Retorna os times com erro', async () => {
      const result = await chai.request(app).get('/teams')
      console.log(result.status, result.body)
      expect(result.status).to.be.equal(404);  
      expect(result.body).to.be.an('object');
      expect(result.body.message).to.be.equal('No teams found')
    });  
  })
});