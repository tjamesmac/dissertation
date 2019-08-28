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
    event.stopPropagation();
    const target = event.target;
    const text = target.innerText;
    const parent = target.parentElement;
    const attr = target.getAttribute('data-demo');
    console.log(parent, 'parent');
    console.log(attr, 'attr');
    console.log(text, 'text');
  };

  let optionMap;

  if (choices) {
    // add 'error handling'
    if (choices[0]._id) {
      optionMap = choices.map( ( options: any ) => {
        return (
          <Option
            key={ options._id }
            data={ options.originalString }
            demo={ options.demographic }
            onClick={ ( e: any ) => choicePicker( e ) }
          />
        );
      } );
    } else {
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
