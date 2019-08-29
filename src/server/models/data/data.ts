import mongoose, { Schema } from 'mongoose';

interface IData {
  originalString: string;
  newString: string;
  orderOfWords: string[];
  demographic: string;
  length: number;
}

interface IDataModel extends IData, mongoose.Document {}

const dataSchema: Schema = new mongoose.Schema({
  originalString: String,
  newString: String,
  orderOfWords: Array,
  demographic: String,
  length: Number,
});

const Data = mongoose.model<IDataModel>('Data', dataSchema);

export default Data;
