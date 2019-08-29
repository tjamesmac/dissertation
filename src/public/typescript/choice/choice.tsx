import React, { useEffect } from 'react';

import Option from './option.extra';

const Choice: React.FunctionComponent = () => {

  const [ choices, setChoices ] = React.useState();

  const fetchData = async () => {
    try {

      const URL = '/choice/data';
      const data = await fetch(URL);
      const response = await data;

      if ( response.status === 200 ) {
        const responseJSON = await response.json();
        // hacky way of getting the last two before the latest
        const arr = [];
        for ( let i = 0; i < responseJSON.length; i++ ) {
          if (i >= 1) {
            arr.push(responseJSON[i]);
          }
        }
        setChoices(arr);
      }
    } catch (error) {
      console.error('fetch results', error);
    }
  };
  useEffect( () => {
      fetchData();
  }, []);

  const choicePicker = ( event: any ) => {
    const target = event.currentTarget;

    const text = target.innerText;
    const parent = target.parentElement;
    const attr = target.getAttribute('data-demo');
    console.log(parent, 'parent');
    console.log(attr, 'attr');
    console.log(text, 'text');
    // ** CONVOLUTED ANSWER
    // Get the id of the options as well
    // then in the post controller search the database for the corresponding document
    // then add the data of that document to a new document/model
    // compare the differences in the demographic and the order of words + sentences
    // index the words - start counting women and men words, initial and the changed ones;

    // I also want to store
    // - the amount of words that can be altered
    // - the amount of words in total;
    // - amount of questions
    // - showcases how many words people think need to be changed.
    // -
    // if no adjectives are returned then
  };

  let optionMap;

  if (choices) {
    // added 'error handling'
    if (choices[0]._id) {
      optionMap = choices.map( ( options: any ) => {
        return (
          <Option
            key={ options._id }
            id={ options._id }
            data={ options.originalString }
            demo={ options.demographic }
            onClick={ ( e: any ) => choicePicker( e ) }
          />
        );
      } );
    } else {
      // ** this message will need redoing
      optionMap = <div>Sorry no results found.</div>;
    }
  } else {
    return (
      <div>Loading...</div>
    );
  }

  return (
      <div className='row'>
        <div className='col-12'>
          <h2 className='header'>Options!</h2>
          <p>Please pick one of the two options below.</p>
          <div className='option-container'>
            {optionMap}
          </div>
          <button className='btn btn-primary' onClick={() => fetchData()}>Click</button>
        </div>
      </div>
  );
};

export default Choice;
