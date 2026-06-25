import { describe, it, expect, beforeAll } from '@jest/globals';
import request from 'supertest';
import app from '../app.js';
import { setupDB, createTestAdmin, getAuthToken } from './setup.js';

setupDB();

describe('Auth API', () => {
  describe('POST /api/auth/login', () => {
    it('should login with valid credentials and return a token', async () => {
      await createTestAdmin();

      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'admin@test.com', password: 'TestPass@123' });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('token');
      expect(res.body).toHaveProperty('_id');
      expect(res.body.email).toBe('admin@test.com');
      expect(res.body.name).toBe('Test Admin');
      expect(res.body).not.toHaveProperty('password');
    });

    it('should return 401 for wrong password', async () => {
      await createTestAdmin();

      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'admin@test.com', password: 'WrongPassword' });

      expect(res.status).toBe(401);
      expect(res.body.message).toBe('Invalid credentials');
    });

    it('should return 401 for non-existent email', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'nobody@test.com', password: 'TestPass@123' });

      expect(res.status).toBe(401);
      expect(res.body.message).toBe('Invalid credentials');
    });
  });

  describe('GET /api/auth/me', () => {
    it('should return admin profile with valid token', async () => {
      const token = await getAuthToken(app, request);

      const res = await request(app)
        .get('/api/auth/me')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.email).toBe('admin@test.com');
      expect(res.body).not.toHaveProperty('password');
    });

    it('should return 401 without token', async () => {
      const res = await request(app).get('/api/auth/me');

      expect(res.status).toBe(401);
      expect(res.body.message).toBe('Not authorized');
    });

    it('should return 401 with invalid token', async () => {
      const res = await request(app)
        .get('/api/auth/me')
        .set('Authorization', 'Bearer invalid-token-here');

      expect(res.status).toBe(401);
      expect(res.body.message).toBe('Token invalid');
    });
  });
});
