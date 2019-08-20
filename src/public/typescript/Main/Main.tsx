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

export const Main: React.FunctionComponent = () => {
  // hooks
  const [ wordsResponse, setWordsResponse ] = React.useState< null | IResponse[] >( null );
  // need to set this as an object that holds the word the synonyms are coming from
  const [ synonyms, setSynonyms ] = React.useState< IWordAndSynonym | null >(null);

  const [ modalState, setModalState ] = React.useState< false | true >( false );

  const [ initialString, setInitialString ] = React.useState< string >('');

  const [ orderChange, setOrderChange ] = React.useState< string[] >([]);

  const [ newString, setNewString ] = React.useState< string >();

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

    if (initialString) {console.log('this is occupied')}

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
        console.log(textAreaValue);
        const textChange = validateWords(responseJSON);
        (document.getElementById('textarea') as HTMLDivElement).innerHTML = textChange;

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
  const arr1: any = [{one: 1, two: 2, three: 3}];
  const arr2 = [{four: 4, five: 5, six: 6}];
  arr1.push(...arr2);
  console.log(arr1);
  console.log(orderChange);

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
                <TextArea response={wordsResponse}></TextArea>
              </div>
            </div>
            <div className='row'>
              <div className='col-4'>
              <button>{ wordsResponse ? 'Submit' : 'Click me' }</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
