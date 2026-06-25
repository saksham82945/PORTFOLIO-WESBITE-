import { describe, it, expect, beforeEach } from '@jest/globals';
import request from 'supertest';
import app from '../app.js';
import Blog from '../models/Blog.js';
import { setupDB, getAuthToken } from './setup.js';

setupDB();

const validBlog = {
  title: 'Test Blog Post',
  slug: 'test-blog-post',
  excerpt: 'This is a test excerpt for the blog post.',
  content: '# Test Content\n\nThis is the full content of the test blog post.',
  category: 'Testing',
  readTime: '3 min read',
  date: 'June 2026',
  published: true,
};

describe('Blog API', () => {
  describe('GET /api/blog', () => {
    it('should return empty array when no blogs exist', async () => {
      const res = await request(app).get('/api/blog');
      expect(res.status).toBe(200);
      expect(res.body).toEqual([]);
    });

    it('should return only published blogs', async () => {
      await Blog.create(validBlog);
      await Blog.create({ ...validBlog, title: 'Draft', slug: 'draft', published: false });

      const res = await request(app).get('/api/blog');
      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(1);
      expect(res.body[0].title).toBe('Test Blog Post');
    });
  });

  describe('GET /api/blog/:slug', () => {
    it('should return a single blog by slug', async () => {
      await Blog.create(validBlog);

      const res = await request(app).get('/api/blog/test-blog-post');
      expect(res.status).toBe(200);
      expect(res.body.title).toBe('Test Blog Post');
      expect(res.body.slug).toBe('test-blog-post');
    });

    it('should return 404 for non-existent slug', async () => {
      const res = await request(app).get('/api/blog/non-existent-slug');
      expect(res.status).toBe(404);
      expect(res.body.message).toBe('Post not found');
    });

    it('should return 404 for unpublished blog', async () => {
      await Blog.create({ ...validBlog, published: false });

      const res = await request(app).get('/api/blog/test-blog-post');
      expect(res.status).toBe(404);
    });
  });

  describe('POST /api/blog', () => {
    it('should create a blog when authenticated', async () => {
      const token = await getAuthToken(app, request);

      const res = await request(app)
        .post('/api/blog')
        .set('Authorization', `Bearer ${token}`)
        .send(validBlog);

      expect(res.status).toBe(201);
      expect(res.body.title).toBe('Test Blog Post');
      expect(res.body).toHaveProperty('_id');
    });

    it('should return 401 without authentication', async () => {
      const res = await request(app)
        .post('/api/blog')
        .send(validBlog);

      expect(res.status).toBe(401);
    });

    it('should reject empty title with validation error', async () => {
      const token = await getAuthToken(app, request);

      const res = await request(app)
        .post('/api/blog')
        .set('Authorization', `Bearer ${token}`)
        .send({ ...validBlog, title: '' });

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('errors');
    });

    it('should reject invalid slug format', async () => {
      const token = await getAuthToken(app, request);

      const res = await request(app)
        .post('/api/blog')
        .set('Authorization', `Bearer ${token}`)
        .send({ ...validBlog, slug: 'Invalid Slug With Spaces!' });

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('errors');
    });
  });

  describe('PUT /api/blog/:id', () => {
    it('should update a blog when authenticated', async () => {
      const token = await getAuthToken(app, request);
      const blog = await Blog.create(validBlog);

      const res = await request(app)
        .put(`/api/blog/${blog._id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ ...validBlog, title: 'Updated Title' });

      expect(res.status).toBe(200);
      expect(res.body.title).toBe('Updated Title');
    });

    it('should return 404 for non-existent blog id', async () => {
      const token = await getAuthToken(app, request);
      const fakeId = '507f1f77bcf86cd799439011';

      const res = await request(app)
        .put(`/api/blog/${fakeId}`)
        .set('Authorization', `Bearer ${token}`)
        .send(validBlog);

      expect(res.status).toBe(404);
    });
  });

  describe('DELETE /api/blog/:id', () => {
    it('should delete a blog when authenticated', async () => {
      const token = await getAuthToken(app, request);
      const blog = await Blog.create(validBlog);

      const res = await request(app)
        .delete(`/api/blog/${blog._id}`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.message).toBe('Post deleted');

      // Verify it's actually deleted
      const found = await Blog.findById(blog._id);
      expect(found).toBeNull();
    });

    it('should return 404 for non-existent blog', async () => {
      const token = await getAuthToken(app, request);
      const fakeId = '507f1f77bcf86cd799439011';

      const res = await request(app)
        .delete(`/api/blog/${fakeId}`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(404);
    });
  });
});
