import mongoose, { Schema } from 'mongoose';

interface IFinalResult {
  // what goes in here

  // demographic match;
  demographicMatch: boolean;
  // length of the submission
  submissionLength: number;
  // amount of words that can be changed
  lengthOfAdjectivesPossible: number;
  // amount of words changed and in the order
  orderChangeLength: number;
  // id of the corresponding document
  correspondingID: string;
}

interface IFinalResultModel extends IFinalResult, mongoose.Document {}

const finalResultSchema: Schema = new mongoose.Schema({
  // goes in here
  demographicMatch: Boolean,
  // length of the submission
  submissionLength: Number,
  // amount of words that can be changed
  lengthOfAdjectivesPossible: Number,
  // amount of words changed and in the order
  orderChangeLength: Number,
  // id of the corresponding document
  correspondingID: String,
});

const FinalResult = mongoose.model<IFinalResultModel>('FinalResult', finalResultSchema);

export default FinalResult;
