import { IWord } from '../../../server/helpers/wordProcessing';

export interface IResponse {
  word: string;
  type: string;
  synonyms: string[];
}

export const validateWords = (response: IResponse[], checkString: string): string => {

  let toChange = checkString;

  for (let key of response) {
    if (checkString.includes(key.word)) {

      const find = key.word;
      const regex = new RegExp(find, 'g');
      // string doesn't replace unless assigned to variable
      const newString = toChange.replace(regex, `<span style='color: green'>${key.word}</span>`);
      // assign changes to the original string
      toChange = newString;

    } else {
      console.log('oh bother');
    }
  }
  return toChange + '&#8203;';
};
