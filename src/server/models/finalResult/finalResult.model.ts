import mongoose, { Schema } from 'mongoose';

interface IFinalResult {
  // what goes in here
}

interface IFinalResultModel extends IFinalResult, mongoose.Document {}

const finalResultSchema: Schema = new mongoose.Schema({
  // goes in here
});

const FinalResult = mongoose.model<IFinalResultModel>('FinalResult', finalResultSchema);

export default FinalResult;
