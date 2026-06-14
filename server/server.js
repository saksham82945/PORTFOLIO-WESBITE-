import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import projectRoutes from './routes/projects.js';
import blogRoutes from './routes/blog.js';
import contactRoutes from './routes/contact.js';
import authRoutes from './routes/auth.js';

import documentRoutes from './routes/documents.js';
import path from 'path';

dotenv.config();
connectDB();

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());

// Serve static uploads
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Routes
app.use('/api/projects', projectRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/documents', documentRoutes);

app.get('/', (req, res) => res.json({ message: '🚀 Saksham Portfolio API is live!' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
