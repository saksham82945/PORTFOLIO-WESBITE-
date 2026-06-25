import { describe, it, expect, jest } from '@jest/globals';
import request from 'supertest';
import app from '../app.js';
import Message from '../models/Message.js';
import { setupDB, getAuthToken } from './setup.js';

// Mock nodemailer so tests don't send real emails
const mockSendMail = jest.fn().mockResolvedValue({ messageId: 'test-id' });
jest.unstable_mockModule('nodemailer', () => ({
  default: {
    createTransport: () => ({
      sendMail: mockSendMail,
    }),
  },
}));

setupDB();

const validContact = {
  name: 'John Doe',
  email: 'john@example.com',
  subject: 'Hello from tests',
  message: 'This is a test message from the unit test suite.',
};

describe('Contact API', () => {
  describe('POST /api/contact', () => {
    it('should save a message and return 201', async () => {
      const res = await request(app)
        .post('/api/contact')
        .send(validContact);

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body.message).toContain('Message sent');

      // Verify message was saved in DB
      const messages = await Message.find();
      expect(messages).toHaveLength(1);
      expect(messages[0].name).toBe('John Doe');
    });

    it('should reject empty name', async () => {
      const res = await request(app)
        .post('/api/contact')
        .send({ ...validContact, name: '' });

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('errors');
    });

    it('should reject invalid email format', async () => {
      const res = await request(app)
        .post('/api/contact')
        .send({ ...validContact, email: 'not-an-email' });

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('errors');
    });

    it('should reject empty subject', async () => {
      const res = await request(app)
        .post('/api/contact')
        .send({ ...validContact, subject: '' });

      expect(res.status).toBe(400);
    });

    it('should reject empty message', async () => {
      const res = await request(app)
        .post('/api/contact')
        .send({ ...validContact, message: '' });

      expect(res.status).toBe(400);
    });

    it('should reject name exceeding 100 characters', async () => {
      const res = await request(app)
        .post('/api/contact')
        .send({ ...validContact, name: 'x'.repeat(101) });

      expect(res.status).toBe(400);
    });
  });

  describe('GET /api/contact', () => {
    it('should return messages when authenticated', async () => {
      const token = await getAuthToken(app, request);
      await Message.create(validContact);

      const res = await request(app)
        .get('/api/contact')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(1);
      expect(res.body[0].name).toBe('John Doe');
    });

    it('should return 401 without authentication', async () => {
      const res = await request(app).get('/api/contact');
      expect(res.status).toBe(401);
    });
  });

  describe('PATCH /api/contact/:id/read', () => {
    it('should mark a message as read', async () => {
      const token = await getAuthToken(app, request);
      const msg = await Message.create(validContact);

      const res = await request(app)
        .patch(`/api/contact/${msg._id}/read`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.read).toBe(true);
    });

    it('should return 401 without authentication', async () => {
      const msg = await Message.create(validContact);

      const res = await request(app)
        .patch(`/api/contact/${msg._id}/read`);

      expect(res.status).toBe(401);
    });
  });
});
