import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it, beforeEach } from 'mocha';
import '../setup.js';
import app from '../../src/app.js';
import Store from '../../src/models/Store.js';

const expect = chai.expect;
chai.use(chaiHttp);

describe('Stores Routes', () => {
  beforeEach(async () => {
    await Store.deleteMany({});
  });

  describe('GET /stores', () => {
    it('should get all stores', async () => {
      await Store.create([
        {
          _id: 'store1',
          name: 'Store 1',
          address: '123 Test St'
        },
        {
          _id: 'store2',
          name: 'Store 2',
          address: '456 Test Ave'
        }
      ]);

      const res = await chai
        .request(app)
        .get('/stores');

      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array');
      expect(res.body).to.have.lengthOf(2);
    });

    it('should return empty array when no stores exist', async () => {
      const res = await chai
        .request(app)
        .get('/stores');

      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array');
      expect(res.body).to.have.lengthOf(0);
    });
  });
});