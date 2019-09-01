import dotenv from 'dotenv';
import mongoose from 'mongoose';

import Data from './data/data';
import FinalResult from './finalResult/finalResult.model';
import User from './user/user';

dotenv.config();

export const connectDb = () => {
  const dbURL: string = process.env.DATABASE_URL || '';
  return mongoose.connect(dbURL, { useNewUrlParser: true });
};

const models = { User, Data, FinalResult };

export default models;
