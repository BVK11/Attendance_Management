import mongoose from 'mongoose';
import { MONGODB_URI } from './config';

mongoose.set('strictQuery', false);

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB connected:', MONGODB_URI);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

connectDB();

export default mongoose.connection;
