import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String, required: true },
  category:    { type: String, enum: ['Frontend', 'Backend', 'Full Stack', 'Three.js'], required: true },
  tags:        [{ type: String }],
  image:       { type: String, default: '' },
  githubUrl:   { type: String, default: '' },
  liveUrl:     { type: String, default: '' },
  featured:    { type: Boolean, default: false },
  date:        { type: String, default: '' },
}, { timestamps: true });

export default mongoose.model('Project', projectSchema);
