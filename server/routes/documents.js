import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { getDocuments, uploadDocument, deleteDocument } from '../controllers/documentController.js';
import protect from '../middleware/auth.js';

const router = express.Router();

// Ensure uploads directory exists
const uploadDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

router.get('/', getDocuments);
router.post('/', protect, upload.single('file'), uploadDocument);
router.delete('/:id', protect, deleteDocument);

export default router;
