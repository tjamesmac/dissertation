import * as React from 'react';
import { submission } from './helpers';

// export interface IMainProps { name: string; }

export const Main: React.FunctionComponent = () => {
  const [words, setWords] = React.useState('');
  const [updatedWord, setUpdatedWords] = React.useState('');

  const getWords = () => {
    const textArea = (document.getElementById('textarea') as HTMLTextAreaElement);
    if (textArea !== null) {
      const value = textArea.innerHTML;
      setWords(value);
      console.log(words);
    } else {
      console.log('i am not working');
    }
  };

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-12'>
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
              <div id='textarea' onChange={() => getWords()} contentEditable></div>
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
