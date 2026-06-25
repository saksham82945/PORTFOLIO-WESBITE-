import { describe, it, expect } from '@jest/globals';
import request from 'supertest';
import app from '../app.js';
import Project from '../models/Project.js';
import { setupDB, getAuthToken } from './setup.js';

setupDB();

const validProject = {
  title: 'Test Project',
  description: 'A comprehensive test project for unit testing the portfolio API.',
  category: 'Full Stack',
  tags: ['React', 'Node.js', 'MongoDB'],
  image: '',
  githubUrl: 'https://github.com/test/project',
  liveUrl: 'https://test-project.com',
  featured: true,
  date: 'June 2026',
};

describe('Projects API', () => {
  describe('GET /api/projects', () => {
    it('should return empty array when no projects exist', async () => {
      const res = await request(app).get('/api/projects');
      expect(res.status).toBe(200);
      expect(res.body).toEqual([]);
    });

    it('should return all projects sorted by createdAt desc', async () => {
      await Project.create(validProject);
      await Project.create({ ...validProject, title: 'Second Project' });

      const res = await request(app).get('/api/projects');
      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(2);
    });
  });

  describe('POST /api/projects', () => {
    it('should create a project when authenticated', async () => {
      const token = await getAuthToken(app, request);

      const res = await request(app)
        .post('/api/projects')
        .set('Authorization', `Bearer ${token}`)
        .send(validProject);

      expect(res.status).toBe(201);
      expect(res.body.title).toBe('Test Project');
      expect(res.body.category).toBe('Full Stack');
      expect(res.body.tags).toEqual(['React', 'Node.js', 'MongoDB']);
    });

    it('should return 401 without authentication', async () => {
      const res = await request(app)
        .post('/api/projects')
        .send(validProject);

      expect(res.status).toBe(401);
    });

    it('should reject missing title', async () => {
      const token = await getAuthToken(app, request);

      const res = await request(app)
        .post('/api/projects')
        .set('Authorization', `Bearer ${token}`)
        .send({ ...validProject, title: '' });

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('errors');
    });

    it('should reject missing description', async () => {
      const token = await getAuthToken(app, request);

      const res = await request(app)
        .post('/api/projects')
        .set('Authorization', `Bearer ${token}`)
        .send({ ...validProject, description: '' });

      expect(res.status).toBe(400);
    });

    it('should reject invalid category', async () => {
      const token = await getAuthToken(app, request);

      const res = await request(app)
        .post('/api/projects')
        .set('Authorization', `Bearer ${token}`)
        .send({ ...validProject, category: 'InvalidCategory' });

      expect(res.status).toBe(400);
    });
  });

  describe('PUT /api/projects/:id', () => {
    it('should update a project when authenticated', async () => {
      const token = await getAuthToken(app, request);
      const project = await Project.create(validProject);

      const res = await request(app)
        .put(`/api/projects/${project._id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ ...validProject, title: 'Updated Project Title' });

      expect(res.status).toBe(200);
      expect(res.body.title).toBe('Updated Project Title');
    });

    it('should return 404 for non-existent project', async () => {
      const token = await getAuthToken(app, request);
      const fakeId = '507f1f77bcf86cd799439011';

      const res = await request(app)
        .put(`/api/projects/${fakeId}`)
        .set('Authorization', `Bearer ${token}`)
        .send(validProject);

      expect(res.status).toBe(404);
    });
  });

  describe('DELETE /api/projects/:id', () => {
    it('should delete a project when authenticated', async () => {
      const token = await getAuthToken(app, request);
      const project = await Project.create(validProject);

      const res = await request(app)
        .delete(`/api/projects/${project._id}`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.message).toBe('Project deleted');

      const found = await Project.findById(project._id);
      expect(found).toBeNull();
    });

    it('should return 404 for non-existent project', async () => {
      const token = await getAuthToken(app, request);
      const fakeId = '507f1f77bcf86cd799439011';

      const res = await request(app)
        .delete(`/api/projects/${fakeId}`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(404);
    });
  });
});
