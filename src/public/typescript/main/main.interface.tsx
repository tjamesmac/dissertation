export interface IWordAndSynonym {
  word: string;
  adjectives?: string[];
  adverbs?: string[];
  nouns?: string[];
  verbs?: string[];
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

export interface IGenderedWords {
  male: string[];
  female: string[];
}
