import dotenv from 'dotenv';
import mongoose from 'mongoose';

import Data from './data/data';
import User from './user/user';

dotenv.config();

export const connectDb = () => {
  const dbURL: string = process.env.DATABASE_URL || '';
  return mongoose.connect(dbURL, { useNewUrlParser: true });
};

const models = { User, Data };

export default models;
