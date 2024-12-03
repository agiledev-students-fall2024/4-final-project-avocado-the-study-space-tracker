import { expect } from 'chai';
import { describe, it } from 'mocha';
import '../setup.js';
import Route from '../../src/models/Route.js';
import Store from '../../src/models/Store.js';
import User from '../../src/models/User.js';

describe('Models', () => {
  describe('Route Model', () => {
    it('should create a valid route', async () => {
      const routeData = {
        name: 'Test Route',
        description: 'Test Description',
        stores: ['store1', 'store2'],
        created_by: 'testuser'
      };

      const route = new Route(routeData);
      const savedRoute = await route.save();
      
      expect(savedRoute.name).to.equal(routeData.name);
      expect(savedRoute.description).to.equal(routeData.description);
      expect(savedRoute.stores).to.have.lengthOf(2);
      expect(savedRoute.created_by).to.equal(routeData.created_by);
    });

    it('should fail without required fields', async () => {
      const route = new Route({});
      
      try {
        await route.save();
      } catch (error) {
        expect(error.errors.name).to.exist;
        expect(error.errors.created_by).to.exist;
      }
    });
  });

  describe('Store Model', () => {
    it('should create a valid store', async () => {
      const storeData = {
        _id: 'store1',
        name: 'Test Store',
        address: '123 Test St',
        rating: 4.5,
        paymentOptions: {
          acceptsCashOnly: 'true',
          acceptsCreditCards: 'false'
        }
      };

      const store = new Store(storeData);
      const savedStore = await store.save();
      
      expect(savedStore._id).to.equal(storeData._id);
      expect(savedStore.name).to.equal(storeData.name);
      expect(savedStore.paymentOptions.acceptsCashOnly).to.equal('true');
    });
  });

  describe('User Model', () => {
    it('should create a valid user', async () => {
      const userData = {
        username: 'testuser',
        password: 'password123'
      };

      const user = new User(userData);
      const savedUser = await user.save();
      
      expect(savedUser.username).to.equal(userData.username);
      expect(savedUser.password).to.equal(userData.password);
    });

    it('should enforce unique usernames', async () => {
      const userData = {
        username: 'uniqueuser',
        password: 'password123'
      };

      await new User(userData).save();
      
      try {
        await new User(userData).save();
        throw new Error('Should not allow duplicate username');
      } catch (error) {
        expect(error.code).to.equal(11000);
      }
    });
  });
});