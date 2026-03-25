import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  personalInfo: {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    location: { type: String },
    linkedin: { type: String },
    website: { type: String },
  },
  summary: {
    type: String,
    default: '',
  },
  education: [{
    institution: String,
    degree: String,
    field: String,
    startDate: String,
    endDate: String,
    description: String,
  }],
  experience: [{
    company: String,
    position: String,
    startDate: String,
    endDate: String,
    description: String,
    current: { type: Boolean, default: false },
  }],
  skills: [{
    type: String,
  }],
  template: {
    type: String,
    enum: ['modern', 'classic'],
    default: 'modern',
  },
}, {
  timestamps: true,
});

export default mongoose.model('Resume', resumeSchema);