import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title:      { type: String, required: true },
  slug:       { type: String, required: true, unique: true },
  excerpt:    { type: String, required: true },
  content:    { type: String, required: true },
  category:   { type: String, required: true },
  coverImage: { type: String, default: '' },
  readTime:   { type: String, default: '5 min read' },
  date:       { type: String, default: '' },
  published:  { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.model('Blog', blogSchema);
