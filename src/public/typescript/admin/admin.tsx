import * as React from 'react';
import Result from './result';

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
        const responseJSON = await response.json();
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
  let newDataArr;
  let dataComp;
  if (data) {
    const dataState = data;
    newDataArr = dataState.filter( ( item: any, index: number ) => {
      if ( index < dataState.length - 5 ) {
        return item;
      }
    } );
    dataComp = <Result data={ newDataArr }final={ final } words={ words }/>;
  } else {
    dataComp = <div>Loading data...</div>;
  }
  return (
    <div className='info'>
      <h2>This is my admin page that will eventually reveal my results.</h2>
      {dataComp}
    </div>
  );
};

export default Admin;
