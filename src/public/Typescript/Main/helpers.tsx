import { IWord } from '../../../server/helpers/wordProcessing';

// types need to be added to the response when the wordnet stuff is added in

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
      console.log(response.status);
      console.log(responseJson, 'response');
      const textChange = validateWords(responseJson, textAreaValue);
      (document.getElementById('textarea') as HTMLDivElement)
      .innerHTML = textChange;
      showSynonyms(responseJson);
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
      // const div = document.createElement('div');
      // item.addEventListener('mouseenter', ( event: any ) => {
      //   // conditionally render the component
      //   // when I get the match
      //   console.log('hello i am in the text area');
      //   console.log(item);
      //   const body = document.getElementsByTagName('body')[0];
      //   div.classList.add('synonym');
      //   body.append(div);

      // });
      // item.addEventListener('mouseleave', ( event: any ) => {
      //   console.log('hello i am going now');
      //   div.classList.remove('synonym');
      // });
    }
  }
  console.log(text);
};
