import Document from '../models/Document.js';
import fs from 'fs';
import path from 'path';
import { safePath } from '../utils/safePath.js';

export const getDocuments = async (req, res) => {
  try {
    const documents = await Document.find().sort({ createdAt: -1 });
    res.json(documents);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const uploadDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    
    const document = await Document.create({
      title: req.body.title || req.file.originalname,
      category: req.body.category || 'Other',
      fileUrl: fileUrl,
      fileName: req.file.filename
    });

    res.status(201).json(document);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteDocument = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    // Validate path to prevent path traversal attacks
    const uploadsDir = path.join(process.cwd(), 'uploads');
    const filePath = safePath(document.fileName, uploadsDir);

    if (!filePath) {
      return res.status(400).json({ message: 'Invalid file path detected' });
    }

    // Delete file from filesystem
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await Document.findByIdAndDelete(req.params.id);
    res.json({ message: 'Document deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
