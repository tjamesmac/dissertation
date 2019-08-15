import * as React from 'react';
import Modal from '../Modal/Modal';
import { IResponse, validateWords } from './helpers';

export const Main: React.FunctionComponent = () => {
  // hooks
  const [ words, setWords ] = React.useState< null | IResponse[] >( null );

  const [ synonyms, setSynonyms ] = React.useState<string[] >([]);

  const [ modalState, setModalState ] = React.useState< false | true >( false );

  React.useEffect(() => {

    const textArea = document.querySelector('#textarea');

    if (textArea) {

      const children: any = textArea.children;

      for (let element of children) {
        element.addEventListener( 'mouseenter', () => {
          if (words) {
            for (let word of words) {
              if (word.word === element.innerHTML) {
                setSynonyms(word.synonyms);
              }
            }
          }
          setModalState(true);
        } );
        element.addEventListener( 'mouseleave', () => {
          setModalState(false);
        } );
      }
    }
  });

  // Functions

  const submission = async ( event: React.FormEvent ) => {
    event.preventDefault();

    /**
     * 
     * This has been changed to innerText - innerHTML security issue
     * Seems to be cleaner to use text
     */
    const textAreaValue: string =
    (document.getElementById('textarea') as HTMLDivElement)
    .innerText;

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
// This is what made the modal work

  if (modalState) {
    if (synonyms) {
      showModal = <Modal words={synonyms} />;
    }
  }

  console.log('please');
  console.log(words);
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-12'>
          {showModal}
          <form onSubmit={( event: React.FormEvent ) => submission( event )}>
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
