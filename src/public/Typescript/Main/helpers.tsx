import { IWord } from '../../../server/helpers/wordProcessing';

export const submission = async (event: React.FormEvent) => {
  event.preventDefault();

  const textAreaValue: string =
  (document.getElementById('textarea') as HTMLTextAreaElement)
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
      validateWords(responseJson[0], textAreaValue);
    }
  } catch (error) {
    console.error('uh oh error', error);
  }
};

export const validateWords = (response: IWord, checkString: string) => {
  console.log(checkString);
  console.log(response.word);
  if (checkString.includes(response.word)) {
    console.log('i found the target');

  } else {
    console.log('oh bother');
  }
};
