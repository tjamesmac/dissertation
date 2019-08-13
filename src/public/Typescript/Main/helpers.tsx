import { IWord } from '../../../server/helpers/wordProcessing';

// types need to be added to the response when the wordnet stuff is added in

export interface IResponse {
  word: string;
  type: string;
  synonyms: string[];
}

export const validateWords = (response: IResponse[], checkString: string) => {
  let toChange = checkString;
  for (let key of response) {
    console.log(key);
    if (checkString.includes(key.word)) {
      console.log('i am in here');
      const find = key.word;
      const regex = new RegExp(find, 'g');
      // string doesn't replace unless assigned to variable
      const newString = toChange.replace(regex, `<span style='color: green'>${key.word}</span>`);
      // assign changes to the original string
      toChange = newString;
      // now I need to create a dropdown menu and populate the synonyms
    } else {
      console.log('oh bother');
    }
  }
  return toChange;
};

export const showSynonyms = (response: any) => {
  const text = (document.querySelector('#textarea') as HTMLDivElement);

  if (text) {
    const children: any = text.children;
    for (let item of children) {
      console.log(item);
      console.log(item.innerHTML);
      for (let key of response) {
        if (key.word === item.innerHTML) {
          console.log('oh my god I got a match');
          console.log(key.synonyms);
        }
      }
    }
  }
  console.log(text);
};
