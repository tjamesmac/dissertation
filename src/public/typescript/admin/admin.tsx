import * as React from 'react';

interface IAdminResponse {
  // stuff to go in here;
}

export const Admin = ( ): JSX.Element => {

  const [ dataResponse, setDataResponse ] = React.useState< null | IAdminResponse >( null );

  const fetchData = async () => {
    try {

      const URL = '/admin/data';
      const data = await fetch(URL);
      const response = await data;

      if ( response.status === 200 ) {
        console.log('thomas is cool');
        const responseJSON = await response.json();
        console.log(responseJSON);
        setDataResponse(responseJSON);
      }
    } catch (error) {
      console.error('admin fetch GET results', error);
    }
  };
  React.useEffect( () => {
      fetchData();
  }, []);

  let dataLoader;
  if ( dataResponse ) {
    dataLoader =
      <div>
        <p>Here is the data you requested</p>
      </div>;
  } else {
    dataLoader =
    <div>
      <p>Currently fetching data...</p>
    </div>;
  }

  return (
    <div className='row'>
      <div className='col-12'>
        <div className='info'>
          <h2>This is my admin page that will eventually reveal my results.</h2>
        </div>
      <div className='col-12'>
        {/* stuff goes here */}
        {dataLoader}
      </div>
      </div>
    </div>
  );
};

export default Admin;
