import * as React from 'react';
import { Redirect } from 'react-router-dom';
import Modal, { IModalPosition } from '../modal/modal';
import TextArea from '../textArea/textArea';
import { createSpan, dataReducer, genderCheck, greenify, validateWords } from './main.helpers';
import { IResponse, IWordAndSynonym } from './main.interface';

export const Main: React.FunctionComponent = () => {
  // HOOKS
  // response from server
  const [ wordsResponse, setWordsResponse ] = React.useState< null | IResponse >( null );

  const [ validLength, setValidLength ] = React.useState< true | false >( false );
  // need to set this as an object that holds the word the synonyms are coming from
  const [ synonyms, setSynonyms ] = React.useState< IWordAndSynonym | null >(null);
  // display modal
  const [ modalState, setModalState ] = React.useState< false | true >( false );

  const [ hoverModalState, setHoverModalState ] = React.useState< false | true >( false );
  // modal position
  const [ modalPosition, setModalPosition ] =
    React.useState< IModalPosition >( { top: 0, left: 0 } );

  const [ nextPage, setNextPage ] = React.useState<false | true >(false);

  const [ demographicWarning, setDemographicWarning ] = React.useState< false | true>(false);

  // store in the db
  const [ submissionData, dispatch ] =
    React.useReducer < any >( dataReducer, {
      originalString: '',
      newString: '',
      orderOfWords: [],
      initialGenderWords: [],
      finalGenderWords: [],
      demographic : '',
      length: 0,
  });
  // cannot use an arrow function here otherwise global ref of 'this' is used;
  function mouseEnterHandler(this: any, event: any) {
    const rect = this.getBoundingClientRect();
    setModalPosition({ top: rect.top + 20, left: rect.left });
    if (wordsResponse) {
      const posKeys: any = Object.keys(wordsResponse);
      console.log(posKeys, 'here are my poskeys');
      console.log(wordsResponse, 'here are my poskeys');
      const synonymObject: any = {};
      for ( const partOfSpeech of posKeys ) {

        const nounTest = wordsResponse[partOfSpeech];
        const keys = Object.keys(nounTest);

        if (keys.length !== 0) {

          for (const word of keys) {
            const value: any = word;
            console.log(word);

            if (value === this.innerText) {
              synonymObject.word = value;
              const nestedWords: any = nounTest[value];
              console.log(nestedWords, 'these are words i should have');
              const syns = nestedWords;

              synonymObject[partOfSpeech] = syns;
            }
            if ( this.innerText !== value ) {

              console.log(this.innerText, 'this is the innerText inside the swapper');
              // console.log(value, 'this is the value inside the swapper');
              const nestedWords: any = nounTest[value];
              // console.log(nestedWords, 'these are the nested words within the swapper');
              const syns = nestedWords;
              if ( syns.includes( this.innerText ) ) {
                const newSynonyms = nestedWords.filter( (item: any) => item !== this.innerText );
                newSynonyms.push(value);

                synonymObject.word = this.innerText;
                synonymObject[partOfSpeech] = newSynonyms;
                console.log(synonymObject, 'syn object');
                setSynonyms(synonymObject);
              }
            }
          }
        }

      }
      for ( const prop of Object.keys(synonymObject) ) {
        if (!synonymObject[prop].length) {
          delete synonymObject[prop];
        }
      }
      // Need to change what setSynonyms accepts
      console.log(synonymObject, 'syn object');
      setSynonyms(synonymObject);

    }
    if (!modalState) {
      setModalState(true);
    }
  }
  function mouseLeaveHandler(this: any, event: any) {

    if (modalState) {
      setTimeout(() => {
        setModalState(false);
      }, 1000);
    }
  }
  React.useEffect(() => {
    const textAreaEffect = document.querySelector('#textarea');
    if (textAreaEffect) {
      const children: any = textAreaEffect.children;
      for (const element of children ) {
        element.addEventListener('mouseenter', mouseEnterHandler);
        element.addEventListener('mouseleave', mouseLeaveHandler);
      }
    }

    return () => {
      const removeTextAreaEffect = document.querySelector('#textarea');
      if (removeTextAreaEffect) {
        const children: any = removeTextAreaEffect.children;
        for (const element of children ) {
          element.removeEventListener('mouseenter', mouseEnterHandler);
          element.removeEventListener('mouseleave', mouseLeaveHandler);
        }
      }
    };
  });
  // Functions

  const updateDemographic = ( event: any ) => {
      const value = event.target!.value;
      dispatch( { type: 'UPDATE_DEMO', payload: value } );
  };

  const submission = async ( event: React.FormEvent ) => {
    event.preventDefault();
    setValidLength(false);
    //
    // This has been changed to innerText - innerHTML security issue
    // Seems to be cleaner to use text
    //
    const textAreaValue: string =
      (document.getElementById('textarea') as HTMLDivElement)
      .innerText;

    dispatch( { type: 'UPDATE_ORIGINAL', payload: textAreaValue } );

    const bodyText: object = { value: textAreaValue };
    try {
      const URL = '/';
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
        const responseJSON: IResponse = await response.json();

        // by keeping this here it does rerender everytime
        const validatedWords = validateWords(responseJSON, textAreaValue);
        console.log(validatedWords);
        const textChange = validatedWords.updatedString;
        const length = validatedWords.valid.length;
        dispatch( { type: 'UPDATE_INITIALGENDER', payload: validatedWords.initialGendered } );

        if ( length === 0 ) {
          console.log('oh no no results');
          setValidLength(true);
        }
        dispatch( { type: 'UPDATE_LENGTH', payload: length } );

        if (!validatedWords.valid.length) {
          setValidLength(true);
        }

        (document.getElementById('textarea') as HTMLDivElement).innerHTML = textChange;

        greenify(); // used to colour the words;

        setWordsResponse(responseJSON);

      }
    } catch (error) {
      console.error('uh oh error', error);
    }
  };
  const getSynonym = (event: any) => {
    const value: string = event.target.innerText;
    const original = (document.getElementById('textarea') as HTMLDivElement);
    const children: any = original.children; // difficult to type HTML collection
    for (const element of children) {
      if (synonyms) {
        if ( synonyms.word === element.innerText ) {
          const synonymsState: any = synonyms;
          const span = createSpan('span', value, 'blue');
          original.replaceChild(span, element);

          let newAdjectives = synonymsState.adjectives;
          if (synonymsState.adjectives && synonymsState.adjectives.includes(value)) {

            newAdjectives = synonymsState.adjectives.filter( ( item: string ) => item !== value );
            newAdjectives.push(element.innerText);
          }
          let newAdverbs = synonymsState.adverbs;
          if (synonymsState.adverbs && synonymsState.adverbs.includes(value) ) {

            newAdverbs = synonymsState.adverbs.filter( ( item: string ) => item !== value );
            newAdverbs.push(element.innerText);
          }
          let newVerbs = synonymsState.verbs;
          if (synonymsState.verbs && synonymsState.verbs.includes(value)) {

            newVerbs = synonymsState.verbs.filter( ( item: string ) => item !== value );
            newVerbs.push(element.innerText);
          }
          let newNouns = synonymsState.nouns;
          if (synonymsState.nouns && synonymsState.nouns.includes(value)) {

            newNouns = synonymsState.nouns.filter( ( item: string ) => item !== value );
            newNouns.push(element.innerText);
          }

          const orderState: any = submissionData;
          const orderStateCheck: any = orderState.orderOfWords;
          console.log(value);
          if (!orderStateCheck.includes(value) ) {
            dispatch( { type: 'UPDATE_ORDER', payload: value } );
          }

          // this is a revolving object
          // by replacing the word prop there is no reference to the word
          // making it hard to maintain
          const rootAndSynonym = {
            word: value,
            adjectives: newAdjectives,
            nouns: newNouns,
            adverbs: newAdverbs,
            verbs: newVerbs,
          };
          setSynonyms(rootAndSynonym);

          dispatch( { type: 'UPDATE_NEW', payload: original.innerText } );
          // update gendered words here

        }
      }
    }
  };
  const submit = async () => {
    try {

      const stateCheck: any = submissionData;
      if (stateCheck.demographic) {
        setDemographicWarning(false);

        const URL = '/data';
        const data = await fetch(URL, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(submissionData),
        });
        const response = await data;
        if (response.status === 200) {
          console.log('submitted');
          console.log('next page lets go');
          setNextPage(!nextPage);

        }
      } else {
        console.log('please fill out the demographic');
        setDemographicWarning(true);
      }

    } catch (error) {
      console.error('uh oh error', error);
    }
  };
  const onHover = () => {
    setHoverModalState(true);
  };
  const removeHover = () => {
    setModalState(false);
    setHoverModalState(false);
  };

  let showModal;
  // This is what made the modal work
  if (modalState || hoverModalState) {
    if ( synonyms ) {
      showModal =
      <Modal
        hover={ () => onHover() }
        removeHover={ () => removeHover() }
        words={ synonyms }
        position={ modalPosition }
        onWordClick={ ( event ) => getSynonym( event ) }
      />;
    }
  }
  let warning;
  if (demographicWarning) {
    warning = <div className='warning'>Please fill out the gender option</div>;
  }

  if (nextPage) {
    console.log('here i go');
    return <Redirect to='/choice' />;
  }
  let validLengthWarning;
  if ( validLength ) {
    validLengthWarning =
      <div>
        <div className='warning'>
          <p>Sorry, none of the words you have chosen are contain synonyms.
          Please type additional text and try again.</p>
        </div>
      </div>
      ;
  }

  console.log(submissionData);
  return (
      <div className='row'>
        <div className='col-12'>
          {showModal}
          <div className='row'>
            <div className='col-12'>
              <label className='label'>Please enter a gender:
                <select id='select' onChange={ ( event ) => updateDemographic( event ) }>
                  <option value=''>-- Please choose an option --</option>
                  <option value='male'>Male</option>
                  <option value='female'>Female</option>
                </select>
              </label>
            </div>
          </div>
          <div className='row'>
            <div className='col-12'>
              {warning}
              {validLengthWarning}
              <TextArea response={wordsResponse}></TextArea>
            </div>
          </div>
          <div className='row'>
            <div className='col-4'>
            <button
              onClick={(event) => submission(event)}
              className='btn btn-primary'>
              Check
            </button>
            <button
              disabled={ validLength ? true : false }
              onClick={() => submit()}
              className='btn btn-primary btn-extra'>
              Submit
            </button>
            </div>
          </div>
        </div>
      </div>
  );
};
