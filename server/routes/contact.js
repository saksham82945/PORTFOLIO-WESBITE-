import express from 'express';
import rateLimit from 'express-rate-limit';
import { body } from 'express-validator';
import { submitContact, getMessages, markAsRead } from '../controllers/contactController.js';
import { validate } from '../middleware/validate.js';
import protect from '../middleware/auth.js';

const router = express.Router();

// Rate limiter for contact form — 10 submissions per 15 minutes per IP
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many contact submissions. Please try again later.' },
});

// Validation chain for contact form
const contactValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ max: 100 }).withMessage('Name must be under 100 characters')
    .escape(),
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email format')
    .normalizeEmail(),
  body('subject')
    .trim()
    .notEmpty().withMessage('Subject is required')
    .isLength({ max: 200 }).withMessage('Subject must be under 200 characters')
    .escape(),
  body('message')
    .trim()
    .notEmpty().withMessage('Message is required')
    .isLength({ max: 5000 }).withMessage('Message must be under 5000 characters'),
];

router.post('/', contactLimiter, contactValidation, validate, submitContact);
router.get('/', protect, getMessages);
router.patch('/:id/read', protect, markAsRead);

export default router;
