import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['Resume', 'CV', 'Project Report', 'Certificate', 'Other'],
    default: 'Other',
  },
  fileUrl: {
    type: String,
    required: true,
  },
  fileName: {
    type: String,
    required: true,
  }
}, { timestamps: true });

export default mongoose.model('Document', documentSchema);
