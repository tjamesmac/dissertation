import { IWord } from '../../../server/helpers/wordProcessing';

export const submission = async (event: React.FormEvent) => {
  event.preventDefault();

  const textAreaValue: string =
  (document.getElementById('textarea') as HTMLDivElement)
  .innerHTML;

  const bodyText: object = {value: textAreaValue};

  try {
    const URL = 'http://localhost:3000/';
    const data = await fetch(URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyText),
    });
    const response = await data;
    if (response.status === 200) {
      const responseJson = await response.json();
      console.log(responseJson, 'response');
      validateWords(responseJson, textAreaValue);
    }
  } catch (error) {
    console.error('uh oh error', error);
  }
};

export const validateWords = (response: any, checkString: string) => {
  let toChange = checkString;
  for (let key of response) {
    console.log(key);
    if (checkString.includes(key.word)) {
      console.log('i am in here');
      const find = key.word;
      const regex = new RegExp(find, 'g');
      // string doesn't replace unless assigned to variable
      const newString = toChange.replace(regex, `<span style='color: green'>${key.word}</span>`);
      // assign changes to the og string
      toChange = newString;
      // now I need to create a dropdown menu and populate the synonyms
    } else {
      console.log('oh bother');
    }
  }
  console.log(toChange);
  (document.getElementById('textarea') as HTMLDivElement)
  .innerHTML = toChange;

};
