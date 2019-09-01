import mongoose, { Schema } from 'mongoose';

interface IWords {
  demographic: string;
  words: any;
}

interface IWordsModel extends IWords, mongoose.Document {}

const wordsSchema: Schema = new mongoose.Schema({
  demographic: String,
  words: Object,
});

const Words = mongoose.model<IWordsModel>('Words', wordsSchema);

export default Words;
