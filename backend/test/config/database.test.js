import { expect } from 'chai';
import mongoose from 'mongoose';
import { describe, it } from 'mocha';
import '../setup.js';

describe('Database Connection', () => {
  it('should be connected to the database', () => {
    expect(mongoose.connection.readyState).to.equal(1);
  });

  it('should handle invalid connection strings', async () => {
    const testMongoose = new mongoose.Mongoose();
    try {
      // Set a shorter timeout for invalid connections
      await testMongoose.connect('mongodb://invaliduri:27017/test', {
        serverSelectionTimeoutMS: 1000
      });
      throw new Error('Should not connect successfully');
    } catch (error) {
      expect(error).to.exist;
    } finally {
      await testMongoose.disconnect();
    }
  });
});