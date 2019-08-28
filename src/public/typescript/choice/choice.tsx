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
        console.log(responseJSON);
        setChoices(responseJSON);
      }
    } catch (error) {
      console.error('fetch results', error);
    }
  };
  useEffect( () => {
      fetchData();
  }, []);

  const choicePicker = () => {

    const options = document.querySelector('.options-container');
    if (options) {
      const children: any = options.children;
      console.log(children);

      for ( const element of children ) {
        console.log(element);
      }
    }
  };

  let optionMap;

  if (choices) {

    optionMap = choices.map( ( options: any ) => {
      return (
        <Option
          key={ options._id }
          data={ options.originalString }
          demo={ options.demographic }
        />
      );
    } );
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
