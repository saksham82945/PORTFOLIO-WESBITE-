import express from 'express';
import { submitContact, getMessages, markAsRead } from '../controllers/contactController.js';
import protect from '../middleware/auth.js';

const router = express.Router();

router.post('/', submitContact);
router.get('/', protect, getMessages);
router.patch('/:id/read', protect, markAsRead);

export default router;
