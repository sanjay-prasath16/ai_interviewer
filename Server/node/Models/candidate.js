import mongoose from 'mongoose';

// Define the Candidate schema
const candidateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  interviewDate: { type: Date, default: Date.now },
  questions_asked: { type: Number, default: 0 },
  interview_data: [
    {
      question: { type: String, required: false },
      response: { type: String, required: false },
    },
  ],
});

export default mongoose.model('Candidate', candidateSchema);