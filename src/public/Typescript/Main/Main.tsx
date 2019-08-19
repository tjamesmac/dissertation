import * as React from 'react';
import Modal, { IModalPosition } from '../Modal/Modal';
import TextArea, { ITextArea } from '../TextArea/TextArea';

import { IResponse, validateWords } from './helpers';

export const Main: React.FunctionComponent = () => {
  // hooks
  const [ wordsResponse, setWordsResponse ] = React.useState< null | IResponse[] >( null );

  const [ synonyms, setSynonyms ] = React.useState< string[] >([]);

  const [ modalState, setModalState ] = React.useState< false | true >( false );

  const [ modalPosition, setModalPosition ] =
    React.useState< IModalPosition >( { top: 0, left: 0 } );

  React.useEffect(() => {

    const textArea = document.querySelector('#textarea');

    if (textArea) {

      const children: any = textArea.children;

      for (let element of children) {

        /**
         * the event has been replaced from mouseenter
         * Apparently mouseenter doesn't bubble but I am having issues with it firing too many times
         */
        const rect = element.getBoundingClientRect();
        element.addEventListener( 'mouseover', (event: Event) => {
          
          console.log(modalPosition.top, modalPosition.left);
          if (modalPosition.top === 0 && modalPosition.left === 0) {
            console.log(rect.top, modalPosition.top, 'top');
            if (rect.top + 20 !== modalPosition.top) {
              console.log('im updating');
              setModalPosition({ top: rect.top + 20, left: rect.left });
              console.log(rect.top, modalPosition.top, 'bottom');
            }
          }
          if (wordsResponse) {
            for (let word of wordsResponse) {
              if (word.word === element.innerHTML) {
                setSynonyms(word.synonyms);

              }
            }
          }
          if (!modalState) {
            setModalState(true);
          }
        } );
        /**
         * the event has been replaced from mouseleave
         */
        element.addEventListener( 'mouseout', () => {
          if (modalState) {
            // setModalState(false);
          }
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

        setWordsResponse(responseJSON);

      }
    } catch (error) {

      console.error('uh oh error', error);

    }
  };

  const getSynonym = (event: any) => {
    const value = event.target.innerText;
    console.log(value);
    console.log('hello');
  };

  let showModal;
// This is what made the modal work
  if (modalState) {
    if (synonyms) {
      showModal =
      <Modal
        words={synonyms}
        position={modalPosition}
        onWordClick={( event ) => getSynonym( event )}
      />;
    }
  }

  console.log('please');
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
                {/* <div id='textarea' contentEditable></div> */}
                <TextArea></TextArea>
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
