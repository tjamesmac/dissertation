import mongoose, { Schema } from 'mongoose';

interface IGender {
  male: string[];
  female: string[];
}
interface IData {
  originalString: string;
  newString: string;
  orderOfWords: string[];
  initialGenderedWords: IGender;
  finalGenderedWords: IGender;
  demographic: string;
  length: number;
}

interface IDataModel extends IData, mongoose.Document {}

const dataSchema: Schema = new mongoose.Schema({
  originalString: String,
  newString: String,
  orderOfWords: Array,
  demographic: String,
  initialGenderedWords: Object,
  finalGenderedWords: Object,
  length: Number,
});

const Data = mongoose.model<IDataModel>('Data', dataSchema);

export default Data;
