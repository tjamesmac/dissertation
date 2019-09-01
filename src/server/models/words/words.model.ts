import mongoose, { Schema } from 'mongoose';

interface IWords {
  demographic: string;
  words: string[];
}

interface IWordsModel extends IWords, mongoose.Document {}

const wordsSchema: Schema = new mongoose.Schema({
  demographic: String,
  words: [String],
});

const Words = mongoose.model<IWordsModel>('Words', wordsSchema);

export default Words;
