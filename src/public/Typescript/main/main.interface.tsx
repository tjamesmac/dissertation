export interface IWordAndSynonym {
  word: string;
  synonyms: string[];
}

export interface IDataPL {
  originalString: string;
  newString: string;
  orderOfWords: string[];
  demographic: string;
}

export interface IResponse {
  [key: string]: string[];
}

// export interface IResponse {
//   word: string;
//   type: string;
//   synonyms: string[];
// }
