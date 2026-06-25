import express from 'express';
import { body } from 'express-validator';
import { getBlogs, getBlogBySlug, createBlog, updateBlog, deleteBlog } from '../controllers/blogController.js';
import { validate } from '../middleware/validate.js';
import protect from '../middleware/auth.js';

const router = express.Router();

// Validation chain for blog posts
const blogValidation = [
  body('title')
    .trim()
    .notEmpty().withMessage('Title is required')
    .isLength({ max: 200 }).withMessage('Title must be under 200 characters'),
  body('slug')
    .trim()
    .notEmpty().withMessage('Slug is required')
    .matches(/^[a-z0-9-]+$/).withMessage('Slug must be lowercase alphanumeric with hyphens'),
  body('excerpt')
    .trim()
    .notEmpty().withMessage('Excerpt is required')
    .isLength({ max: 500 }).withMessage('Excerpt must be under 500 characters'),
  body('content')
    .trim()
    .notEmpty().withMessage('Content is required'),
  body('category')
    .trim()
    .notEmpty().withMessage('Category is required'),
];

router.get('/', getBlogs);
router.get('/:slug', getBlogBySlug);
router.post('/', protect, blogValidation, validate, createBlog);
router.put('/:id', protect, blogValidation, validate, updateBlog);
router.delete('/:id', protect, deleteBlog);

export default router;
