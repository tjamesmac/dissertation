import * as React from 'react';

export interface IResponse {
  word: string;
  type: string;
  synonyms: string[];
}

export const validateWords = ( response: IResponse[] ): string => {

  const textAreaValue: string =
    (document.getElementById('textarea') as HTMLDivElement)
    .innerText;

  let toChange = textAreaValue;

  for (let key of response) {

    if (textAreaValue.includes(key.word)) {

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
