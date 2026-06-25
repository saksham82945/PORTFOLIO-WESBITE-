import express from 'express';
import { body } from 'express-validator';
import { getProjects, createProject, updateProject, deleteProject } from '../controllers/projectController.js';
import { validate } from '../middleware/validate.js';
import protect from '../middleware/auth.js';

const router = express.Router();

// Validation chain for projects
const projectValidation = [
  body('title')
    .trim()
    .notEmpty().withMessage('Title is required')
    .isLength({ max: 200 }).withMessage('Title must be under 200 characters'),
  body('description')
    .trim()
    .notEmpty().withMessage('Description is required')
    .isLength({ max: 2000 }).withMessage('Description must be under 2000 characters'),
  body('category')
    .trim()
    .notEmpty().withMessage('Category is required')
    .isIn(['Frontend', 'Backend', 'Full Stack', 'Three.js']).withMessage('Invalid category'),
];

router.get('/', getProjects);
router.post('/', protect, projectValidation, validate, createProject);
router.put('/:id', protect, projectValidation, validate, updateProject);
router.delete('/:id', protect, deleteProject);

export default router;
