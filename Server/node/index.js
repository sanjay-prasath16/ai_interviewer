import express from 'express';
import mongoose from 'mongoose';
import interviewRoutes from './routes/routes.js';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/interviewDB')
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.error('MongoDB connection error:', error));

app.use('/', interviewRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});