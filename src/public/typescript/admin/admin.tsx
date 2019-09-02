import * as React from 'react';

export const Admin = ( ): JSX.Element => {

  const fetchData = async () => {
    try {

      const URL = '/data';
      const data = await fetch(URL);
      const response = await data;

      if ( response.status === 200 ) {
        console.log('thomas is cool');
        console.log(response.status);
      }
    } catch (error) {
      console.error('fetch results', error);
    }
  };
  React.useEffect( () => {
      fetchData();
  }, []);

  return (
    <div className='row'>
      <div className='col-12'>
        <div className='info'>
          <h2>This is my admin page that will eventually reveal my results.</h2>
        </div>
      <div className='col-12'>
        {/* stuff goes here */}
      </div>
      </div>
    </div>
  );
};

export default Admin;
