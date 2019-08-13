import * as React from 'react';
import { IResponse, validateWords  } from './helpers';


// export interface IMainProps { name: string; }
interface IModalProps { words: string[]; }
const Modal = (prop: IModalProps) => {
  const words: string[] = prop.words;
  const wordMap = words.map((word: string, index: number) => {
    return <li key={index}>{word}</li>;
  });
  return (
    <ul className='synonym'>
      {wordMap}
    </ul>
  );
};
export const Main: React.FunctionComponent = () => {
  const [words, setWords] = React.useState< null | IResponse[] >(null);
  const [modalState, setModalState] = React.useState< false | true >(false);

  const submission = async (event: React.FormEvent) => {
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
        const responseJSON: IResponse[] = await response.json();
        const textChange = validateWords(responseJSON, textAreaValue);
        (document.getElementById('textarea') as HTMLDivElement)
        .innerHTML = textChange;

        setWords(responseJSON);

      }
    } catch (error) {
      console.error('uh oh error', error);
    }
  };

  let showModal;
  if (words) {
    for (let word of words) {
      console.log('inside state loop');
      console.log(word);
      console.log(word.word);
      // const textAreaValue: string =
      //   (document.getElementById('textarea') as HTMLDivElement)
      //   .innerHTML;
      const textAreaValue: Element | null = document.querySelector('#textarea');
      console.log(textAreaValue);
      if (textAreaValue) {
        // type of HTMLCollection not recognised as array
        const children: any = textAreaValue.children;
        console.log(children);
        for (let element of children) {
          console.log(element);
          if (word.word === element.innerHTML) {
            console.log('oh boy i got it');
            if (modalState) {
              showModal = <Modal words={word.synonyms}/>;
            }
          } else {
            console.log('I dont equal');
          }
        }
      }
    }
  }

  const show = () => setModalState(!modalState);
  console.log('please');
  console.log(words);
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-12'>
          <button type='button' onClick={() => show()}>hello button</button>
          {showModal}
          <form onSubmit={(e: React.FormEvent) => submission(e)}>
            <div className='row'>
              <div className='col-12'>

              <label>Please enter a gender</label>
              <input></input>
              </div>
            </div>
            <div className='row'>
              <div className='col-12'>
              <label>Please enter an advert</label>
              <div id='textarea' contentEditable></div>
              </div>
            </div>
            <div className='row'>
              <div className='col-4'>
              <button>Click me</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
