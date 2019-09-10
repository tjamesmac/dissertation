import * as React from 'react';
import Result, { ResultData, ResultFinal } from './result';

export const Admin = ( ): JSX.Element => {
  const [ words, setWords ] = React.useState();
  const [ final, setFinal ] = React.useState();
  const [ data, setData ] = React.useState();
  const fetchData = async () => {
    try {

      const URL = '/admin/data';
      const data = await fetch(URL);
      const response = await data;

      if (response.status === 200) {
        console.log('I have finally made it here');
        const responseJSON = await response.json();
        console.log(responseJSON);
        setWords(responseJSON.words);
        setFinal(responseJSON.final);
        setData(responseJSON.data);
      }
    } catch (error) {
      console.error('fetch results', error);
    }
  };
  React.useEffect( () => {
      fetchData();
  }, []);
  let dataComp;
  if (data) {
    
    dataComp = <Result data={ data } component={ <ResultData/> } />;
      
  } else {
    dataComp = <div>Loading data...</div>;
  }
  let finalComp;
  if (data) {
    
    finalComp = <Result data={ data } component={ <ResultFinal/> } />;
  } else {
    finalComp = <div>Loading data...</div>;
  }
  return (
    <div className='info'>
      <h2>This is my admin page that will eventually reveal my results.</h2>
      <Result></Result>
    </div>
  );
};

export default Admin;
