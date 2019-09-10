import mongoose, { Schema } from 'mongoose';

interface IGender {
  male: string[];
  female: string[];
}

interface IFinalResult {

  demographicMatch: boolean;
  demographic: string;
  originalSubmissionLength: number;
  finalSubmissionLength: number;
  lengthOfAdjectivesPossible: number;
  orderChangeLength: number;
  correspondingID: string;
  initialGenderedWords: IGender;
  finalGenderedWords: IGender;

}

interface IFinalResultModel extends IFinalResult, mongoose.Document {}

const finalResultSchema: Schema = new mongoose.Schema({

  demographicMatch: Boolean,
  demographic: String,
  originalSubmissionLength: Number,
  finalSubmissionLength: Number,
  lengthOfAdjectivesPossible: Number,
  orderChangeLength: Number,
  correspondingID: String,
  initialGenderedWords: Object,
  finalGenderedWords: Object,

});

const FinalResult = mongoose.model<IFinalResultModel>('FinalResult', finalResultSchema);

export default FinalResult;
