import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import bcrypt from 'bcryptjs';
import Admin from '../models/Admin.js';

let mongoServer;

/**
 * Connect to in-memory MongoDB before all tests
 */
export const setupDB = () => {
  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();

    // Set required env vars for tests
    process.env.JWT_SECRET = 'test-jwt-secret-key-for-testing-only';
    process.env.EMAIL_USER = 'test@example.com';
    process.env.EMAIL_PASS = 'test-password';
    process.env.CLIENT_URL = 'http://localhost:5173';
    process.env.NODE_ENV = 'test';

    await mongoose.connect(uri);
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
  });

  afterEach(async () => {
    // Clean all collections after each test
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      await collections[key].deleteMany({});
    }
  });
};

/**
 * Create a test admin and return the login credentials + token helper
 */
export const createTestAdmin = async () => {
  const admin = await Admin.create({
    email: 'admin@test.com',
    password: 'TestPass@123',
    name: 'Test Admin',
  });
  return admin;
};

/**
 * Get a valid auth token for testing protected routes
 */
export const getAuthToken = async (app, supertest) => {
  await createTestAdmin();
  const res = await supertest(app)
    .post('/api/auth/login')
    .send({ email: 'admin@test.com', password: 'TestPass@123' });
  return res.body.token;
};
