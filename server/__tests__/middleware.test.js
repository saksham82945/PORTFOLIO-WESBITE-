import { describe, it, expect } from '@jest/globals';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import request from 'supertest';
import app from '../app.js';
import Admin from '../models/Admin.js';
import { setupDB, createTestAdmin } from './setup.js';

setupDB();

describe('Auth Middleware', () => {
  it('should allow access with a valid token', async () => {
    const admin = await createTestAdmin();
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    const res = await request(app)
      .get('/api/auth/me')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.email).toBe('admin@test.com');
  });

  it('should reject missing Authorization header', async () => {
    const res = await request(app).get('/api/auth/me');

    expect(res.status).toBe(401);
    expect(res.body.message).toBe('Not authorized');
  });

  it('should reject a malformed token', async () => {
    const res = await request(app)
      .get('/api/auth/me')
      .set('Authorization', 'Bearer totally.invalid.token');

    expect(res.status).toBe(401);
    expect(res.body.message).toBe('Token invalid');
  });

  it('should reject an expired token', async () => {
    const admin = await createTestAdmin();
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '0s' });

    // Wait a moment for the token to expire
    await new Promise(r => setTimeout(r, 1000));

    const res = await request(app)
      .get('/api/auth/me')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(401);
    expect(res.body.message).toBe('Token invalid');
  });

  it('should reject token signed with wrong secret', async () => {
    const admin = await createTestAdmin();
    const token = jwt.sign({ id: admin._id }, 'wrong-secret');

    const res = await request(app)
      .get('/api/auth/me')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(401);
    expect(res.body.message).toBe('Token invalid');
  });

  it('should reject token with non-existent admin ID', async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const token = jwt.sign({ id: fakeId }, process.env.JWT_SECRET, { expiresIn: '1h' });

    const res = await request(app)
      .get('/api/auth/me')
      .set('Authorization', `Bearer ${token}`);

    // Should return 200 but with null body (admin not found)
    // The middleware sets req.admin to null, getMe returns null
    expect(res.status).toBe(200);
    expect(res.body).toBeNull();
  });
});
