import * as React from 'react';

export interface IResponse {
  word: string;
  type: string;
  synonyms: string[];
}

export const validateWords = ( response: IResponse[], textCheck: string ): string => {

  

  let toChange = textCheck;

  for (let key of response) {

    if (textCheck.includes(key.word)) {

      const word = key.word;
      const regex = new RegExp(word, 'g');
      // string doesn't replace unless assigned to variable
      const newString = toChange.replace(regex, `<span style='color: green'>${word}</span>`);
      // assign changes to the original string
      toChange = newString;

    } else {
      console.log('oh bother');
    }
  }
  return toChange + '&#8203;';
};
