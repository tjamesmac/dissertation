import * as React from 'react';

interface IResultDataComp {
  data: any;
  component: any;
}
interface IResultFinalComp {
  data: any;
}
interface IResultWordComp {
  data: any;
}
export const ResultData = ( prop: any ): JSX.Element => {
  const data = prop.data;

  const [ dataPosition, setDataPosition ] = React.useState(data.length - 1);
  const handlePositionIncrease = ( position: number ) => {
    const currentPosition = position;
    if (currentPosition < data.length - 1) {
      setDataPosition(currentPosition + 1);
      console.log(dataPosition);
    }

  };
  const handlePositionDecrease = ( position: number ) => {
    const currentPosition = position;
    if (currentPosition >= 0 && currentPosition ) {
      setDataPosition(currentPosition - 1);
      console.log(dataPosition);
    }
  };
  const keys = Object.keys(data);
  for ( const element of keys ) {
    console.log(data[element]);
  }
  const genderedResultMaker = (array: string[]) => {
    let itemOfArray;
    if (array.length) {
      return itemOfArray = array.map( (item: any) => {
        return <div className='data-result'>{item}</div>;
      } );
    } else {
      return itemOfArray = <div className='data-result'>No results.</div>;
    }
  };
  const maleItemsIn = genderedResultMaker(data.initialGenderedWords.male);
  const femaleItemsIn = genderedResultMaker(data.initialGenderedWords.female);
  const maleItemsFi = genderedResultMaker(data.finalGenderedWords.male);
  const femaleItemsFi = genderedResultMaker(data.finalGenderedWords.female);

  let orderOfWords;
  if (data.orderOfWords.length) {
    orderOfWords = data.orderOfWords.map( (item: any) => {
      return <div className='data-result'>{item}</div>;
    } );
  } else {
    orderOfWords = <div className='data-result'>No results.</div>;
  }

  const formattedData =
  <div>
    <li className='data-item'>
      <div className='data-title'>Initial String</div>
      <div className='data-result'>{data.originalString}</div>
    </li>
    <li className='data-item'>
      <div className='data-title'>New String</div>
      <div className='data-result'>{data.newString}</div>
    </li>
    <li className='data-item'>
      <div className='data-title'>Initial Gendered Language</div>
        <div className='data-result-shared'>
          <div>Male</div>
          <div>{maleItemsIn}</div>
        </div>
        <div className='data-result-shared'>
          <div>Female</div>
          <div>{femaleItemsIn}</div>
      </div>
    </li>
    <li className='data-item'>
    <div className='data-title'>Final Gendered Language</div>
      <div className='data-result-shared'>
        <div>Male</div>
        <div>{maleItemsFi}</div>
      </div>
      <div className='data-result-shared'>
        <div>Female</div>
        <div>{femaleItemsFi}</div>
      </div>
    </li>
    <li className='data-item'>
      <div className='data-title'>Order Of Words Changed</div>
      {orderOfWords}
    </li>
    <li className='data-item'>
      <div className='data-title'>Length of Submission</div>
      {data.length}
    </li>
    <div>
        <button onClick={() => handlePositionIncrease(dataPosition)}>Increase</button>
        <button onClick={() => handlePositionDecrease(dataPosition)}>Decrease</button>
      </div>
  </div>;

  return (
    <div>{formattedData}</div>
  );
};

export const ResultFinal = ( prop: any ): JSX.Element => {
  return (
    <div>Hello world.</div>
  );
};

export const Result = ( prop: any ): JSX.Element => {
  const data = prop.data;
  const Component = prop.component;
  return (
    <div className='result'>
      <p>This is called my Result component</p>
      <ResultData />
      <ResultFinal />
    </div>
  );
};

export default Result;
