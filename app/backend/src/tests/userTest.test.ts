import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import oneUser from './mocks/userMock';
import { app } from '../app';

import { Response } from 'superagent';
import UserModel from '../database/models/UserModel';

chai.use(chaiHttp);

const { expect } = chai;

describe('Login', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  // let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(UserModel, "findOne")
      .resolves(
        oneUser as UserModel
      );
  });

  after(()=>{
    (UserModel.findOne as sinon.SinonStub).restore();
  })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });

  it('Deve criar um usuario com sucesso', async () => {
    const result = await chai.request(app).post('/login').send({
      email: 'admin@admin.com',
      password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
    });
    expect(result.status).to.be.equal(200);
  });
});
