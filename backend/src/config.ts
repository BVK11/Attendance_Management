import dotenv from 'dotenv';

dotenv.config();

export const MONGODB_URI = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/attendance_management';
export const PORT = Number(process.env.PORT ?? 4000);
