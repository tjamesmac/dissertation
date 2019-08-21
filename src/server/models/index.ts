import dotenv from 'dotenv';
import mongoose from 'mongoose';

import User from './user/user';

dotenv.config();

const connectDb = () => {
  const dbURL: string = process.env.DATABASE_URL || '';
  return mongoose.connect(dbURL);
};
