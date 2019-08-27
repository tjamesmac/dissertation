import React, { useEffect } from 'react';

const Choice: React.FunctionComponent = () => {

  const fetchData = async () => {
    try {
      const URL = '/choice';
      const data = await fetch(URL);
      const response = await data;
      if ( response.status === 200 ) {
        console.log('got it');
        const responseJSON = await response.json();
        console.log(responseJSON);
      }
    } catch (error) {
      console.error('fetch results', error);
    }
  };
  useEffect( () => {
      console.log('lets effect');
      fetchData();
  });

  return (
      <div className='row'>
        <div className='col-12'>
          <h2 className='header'>Options!</h2>
          <p>Please pick one of the two options below.</p>
          <button className='btn btn-primary' onClick={() => fetchData()}>Click</button>
        </div>
      </div>
  );
};

export default Choice;
