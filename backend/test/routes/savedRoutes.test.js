import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it, beforeEach } from 'mocha';
import '../setup.js';
import app from '../../src/app.js';
import Route from '../../src/models/Route.js';
import User from '../../src/models/User.js';
import Store from '../../src/models/Store.js';
import jwt from 'jsonwebtoken';

const expect = chai.expect;
chai.use(chaiHttp);

describe('Saved Routes', () => {
  let token;
  let testUser;
  let testStore;

  beforeEach(async () => {
    await Route.deleteMany({});
    await User.deleteMany({});
    await Store.deleteMany({});

    testUser = await User.create({
      username: 'routetester',
      password: 'password123'
    });

    testStore = await Store.create({
      _id: 'store1',
      name: 'Test Store',
      address: '123 Test St'
    });

    token = jwt.sign(
      { userId: testUser._id, username: testUser.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
  });

  describe('POST /routes', () => {
    it('should create a new route', async () => {
      const routeData = {
        name: 'Test Route',
        description: 'Test Description',
        stores: [testStore._id]
      };

      const res = await chai
        .request(app)
        .post('/routes')
        .set('Authorization', `Bearer ${token}`)
        .send(routeData);

      expect(res).to.have.status(201);
      expect(res.body.name).to.equal(routeData.name);
      expect(res.body.stores).to.have.lengthOf(1);

      const user = await User.findById(testUser._id);
      expect(user.saved_routes).to.have.lengthOf(1);
    });

    it('should require at least one store', async () => {
      const routeData = {
        name: 'Test Route',
        description: 'Test Description',
        stores: []
      };

      const res = await chai
        .request(app)
        .post('/routes')
        .set('Authorization', `Bearer ${token}`)
        .send(routeData);

      expect(res).to.have.status(500);
    });
  });

  describe('GET /routes/:routeId', () => {
    it('should get a specific route', async () => {
      const route = await Route.create({
        name: 'Test Route',
        description: 'Test Description',
        stores: [testStore._id],
        created_by: testUser.username
      });

      const res = await chai
        .request(app)
        .get(`/routes/${route._id}`);

      expect(res).to.have.status(200);
      expect(res.body.name).to.equal('Test Route');
    });
  });
});