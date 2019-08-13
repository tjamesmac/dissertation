import * as React from 'react';
import { validateWords } from './helpers';

// export interface IMainProps { name: string; }
export interface IModalProps { words: string[]; }

export const Main: React.FunctionComponent = () => {
  const [words, setWords] = React.useState('');
  const [updatedWord, setUpdatedWords] = React.useState('');
  const [modalState, setModalState] = React.useState(false);

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
        const responseJSON = await response.json();
        console.log(response.status);
        console.log(responseJSON, 'response');
        const textChange = validateWords(responseJSON, textAreaValue);
        (document.getElementById('textarea') as HTMLDivElement)
        .innerHTML = textChange;
      }
    } catch (error) {
      console.error('uh oh error', error);
    }
  };

  const Modal = (prop: IModalProps) => {
    console.log('here I am in the modal');
    const wordArray = prop.words;
    const wordList = wordArray.map((word: string, index: number) => {
        return <li key={index}>{word}</li>;
    });
    return (
      <ul className='synonym'>
        {wordList}
      </ul>
    );
  };
  let showModal;
  if (modalState) {
    showModal = <Modal words={['wordOne', 'wordTwo']}/>;
  }
  const show = () => setModalState(!modalState);

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-12'>
          <form onSubmit={(e: React.FormEvent) => submission(e)}>
            <div className='row'>
              <div className='col-12'>
              <button onClick={() => show()}>hello button</button>
                {showModal}
                <div id='textarea' contentEditable></div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
