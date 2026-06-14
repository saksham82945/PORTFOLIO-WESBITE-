import express from 'express';
import { getBlogs, getBlogBySlug, createBlog, updateBlog, deleteBlog } from '../controllers/blogController.js';
import protect from '../middleware/auth.js';

const router = express.Router();

router.get('/', getBlogs);
router.get('/:slug', getBlogBySlug);
router.post('/', protect, createBlog);
router.put('/:id', protect, updateBlog);
router.delete('/:id', protect, deleteBlog);

export default router;
