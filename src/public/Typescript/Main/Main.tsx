import * as React from 'react';
import Modal, { IModalPosition } from '../Modal/Modal';
import TextArea, { ITextArea } from '../TextArea/TextArea';

import { IResponse, validateWords } from './helpers';

/**
 * Now I need to store the values before they are changed
 * I can create a use state that merges the previous with the new to record them all with a number
 * to show the order in which they are changed
 *
 * Need to look into whether I change all the words that are the same at once
 *
 */

export interface IWordAndSynonym {
  word: string;
  synonyms: string[];
}

/**
 * THIS IS A TEST INTERFACE
 */
interface ITest {
  originalString: string;
  newString: string;
  changedWords: string[];
  demographic: string;

}

export const Main: React.FunctionComponent = () => {
  // hooks
  // response from server
  const [ wordsResponse, setWordsResponse ] = React.useState< null | IResponse[] >( null );
  // need to set this as an object that holds the word the synonyms are coming from
  const [ synonyms, setSynonyms ] = React.useState< IWordAndSynonym | null >(null);
  // display modal
  const [ modalState, setModalState ] = React.useState< false | true >( false );
  // store the original string
  const [ initialString, setInitialString ] = React.useState< string >('');

  const [ orderChange, setOrderChange ] = React.useState< string[] >([]);

  const [ newString, setNewString ] = React.useState< string >();


  /**
   * THIS IS A TEST HOOK
   */
  const [ test, setTest ] = React.useState< ITest >({
    originalString: 'this is the og string',
    newString: 'new string on the block',
    changedWords: ['changeOne', 'changeTwo'],
    demographic : 'smurf',
  });

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
        element.addEventListener( 'mouseover', ( event: Event ) => {

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
                const rootAndSynonym = { word: word.word, synonyms: word.synonyms };
                setSynonyms(rootAndSynonym);

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

    const bodyText: object = { value: textAreaValue };

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
        // by keeping this here it does rerender everytime
        const textChange = validateWords(responseJSON);
        (document.getElementById('textarea') as HTMLDivElement).innerHTML = textChange;

        // use a reducer here to store the response and the string.
        setWordsResponse(responseJSON);

      }
    } catch (error) {

      console.error('uh oh error', error);

    }
  };
  const createSpan = ( elementTag: string, text: string ) => {

    const span = document.createElement(elementTag);
    const textNode = document.createTextNode(text);
    span.appendChild(textNode);
    return span;
  
  };
  const getSynonym = (event: any) => {

    const value: string = event.target.innerText;

    // save initial string here
    const initial = (document.getElementById('textarea') as HTMLDivElement);
    const children: any = initial.children;
    const initialText = initial.innerText;
    console.log(initialText);
    setInitialString(initialText);
    // update text area here
    for (let element of children) {
      if (synonyms) {
        if (synonyms.word === element.innerText) {
          const span = createSpan('span', value);
          span.style.color = 'blue';
          initial.replaceChild(span, element);

          setOrderChange( (oldArray) => [...oldArray, value] );
          console.log(orderChange);
        }
      }
    }
    console.log(initial.innerText);
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


  const click = () => {
    console.log('click clack');
  };
  const submit = async () => {

    try {

      const URL = 'http://localhost:3000/data';

      const data = await fetch(URL, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },

        body: JSON.stringify(test),

      });

      const response = await data;

      if (response.status === 200) {

        console.log('cool');

      }
    } catch (error) {

      console.error('uh oh error', error);

    }
  };
  console.log('please');
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-12'>
          {showModal}
          <form onSubmit={( event: React.FormEvent ) => submission( event )}>
            <div className='row'>
              <div className='col-12'>
              <label className='label'>Please enter a gender</label>
              <input className=''></input>
              </div>
            </div>
            <div className='row'>
              <div className='col-12'>
                <label className='label'>Please enter an advert</label>
                <TextArea response={wordsResponse}></TextArea>
              </div>
            </div>
            <div className='row'>
              <div className='col-4'>
              <button
                onClick={ wordsResponse ? ( ) => submit() : () => click()}
                className='btn btn-primary'>
                { wordsResponse ? 'Submit' : 'Click me' }
              </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
