import * as React from 'react';
import { Redirect } from 'react-router-dom';
import Balance from '../balance/balance';
import Modal, { IModalPosition } from '../modal/modal';
import TextArea from '../textArea/textArea';
import { createSpan, dataReducer, greenify, validateWords } from './main.helpers';
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

  const [ maleWords , setMaleWords ] = React.useState< number > (0);

  const [ femaleWords , setFemaleWords ] = React.useState< number > (0);

  // store in the db
  const [ submissionData, dispatch ] =
    React.useReducer < any >( dataReducer, {
      originalString: '',
      newString: '',
      orderOfWords: [],
      demographic : '',
      length: 0,
  });
  // cannot use an arrow function here otherwise global ref of 'this' is used;
  function mouseEnterHandler(this: any, event: any) {
    const rect = this.getBoundingClientRect();
    setModalPosition({ top: rect.top + 20, left: rect.left });
    if (wordsResponse) {
      const keys: any = Object.keys(wordsResponse);
      for (const value of keys) {
        if (value === this.innerText) {
          const syns = wordsResponse[value];
          const rootAndSynonym = { word: value, synonyms: syns };
          setSynonyms(rootAndSynonym);
        }
        if ( this.innerText !== value ) {
          const syns = wordsResponse[value];
          if ( syns.includes( this.innerText ) ) {
            const newSynonyms = wordsResponse[value].filter( (item) => item !== this.innerText );
            newSynonyms.push(value);

            const rootAndSynonym = { word: this.innerText, synonyms: newSynonyms };
            setSynonyms(rootAndSynonym);
          }
        }
      }
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
        console.log(responseJSON, 'response');
        const length = Object.keys(responseJSON).length;
        if ( length === 0 ) {
          console.log('oh no no results');
          setValidLength(true);
        }
        dispatch( { type: 'UPDATE_LENGTH', payload: length } );

        // by keeping this here it does rerender everytime
        const validatedWords = validateWords(responseJSON, textAreaValue);
        const textChange = validatedWords.textChange;

        if ( !textChange.includes(`='male'`) && !textChange.includes(`='female'`)) {
          setValidLength(true);
        }

        (document.getElementById('textarea') as HTMLDivElement).innerHTML = textChange;

        const checkForGender: any = document.querySelector('#textarea');
        const genderChildren = checkForGender.children;

        let maleCheckCount = 0;
        let femaleCheckCount = 0;

        for ( const element of genderChildren ) {
          if (element.className === 'male') {
            maleCheckCount++;
          }
          if (element.className === 'female') {
            femaleCheckCount++;
          }
        }
        setMaleWords(maleCheckCount);
        setFemaleWords(femaleCheckCount);

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
        if (synonyms.word === element.innerText || synonyms.synonyms.includes(element.innerText)) {

          const span = createSpan('span', value, 'blue');
          original.replaceChild(span, element);

          const newSynonyms = synonyms.synonyms.filter( (item) => item !== value );
          newSynonyms.push(element.innerText);

          const rootAndSynonym = { word: value, synonyms: newSynonyms };
          setSynonyms(rootAndSynonym);

          dispatch( { type: 'UPDATE_ORDER', payload: value } );
          dispatch( { type: 'UPDATE_NEW', payload: original.innerText } );

        }
      }
    }
  };
  const submit = async () => {
    try {
      // this needs to be a process.env at some point
      // just kidding can use a relative path
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
          <p>Sorry, none of the words you have chosen are gendered adjectives.
          Please type additional text and try again.</p>
        </div>
      </div>
      ;
  }

  let showBalance;
  if (maleWords || femaleWords) {
    showBalance = <Balance male={maleWords} female={femaleWords} />;
  }

  return (
      <div className='row'>
        <div className='col-12'>
          {showModal}
          <div className='row'>
            <div className='col-12'>
              <label className='label'>Please enter a gender:</label>
              <select onChange={ ( event ) => updateDemographic( event ) }>
                <option value=''>-- Please choose an option --</option>
                <option value='male'>Male</option>
                <option value='female'>Female</option>
              </select>
            </div>
          </div>
          <div className='row'>
            <div className='col-12'>
              {warning}
              {validLengthWarning}
              {showBalance}
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
