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

  const choicePicker = ( event: any ) => {

    const target = event.target;
    const text = target.innerText;

    const parent = target.parentElement;
    console.log(parent);
    const attr = parent.getAttribute('data-demo');
    console.log(attr);
    console.log(text);
    // const options = document.querySelector('.options-container');
    // console.log(options);
    // if (options) {
    //   const children: any = options.children;
    //   console.log(children);

    //   for ( const element of children ) {
    //     console.log(element);
    //     element.addEventListener('click', ( event: Event ) => {
    //       const value = event.target;
    //       console.log(value);

    //     } );
    //   }
    // }
  };
  

  let optionMap;

  if (choices) {

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
