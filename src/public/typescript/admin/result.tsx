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

  const [ dataPosition, setDataPosition ] = React.useState(data.length - 1);

  console.log(dataPosition);

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
  console.log(data);
  if (data) {
    console.log(data[dataPosition]);
  }

  return (
    <div className='result'>
      <p>This is called my Result component</p>
      {dataPosition}
      
      <ResultData data={data[dataPosition]} />
      <div>
        <button onClick={() => handlePositionIncrease(dataPosition)}>Increase</button>
        <button onClick={() => handlePositionDecrease(dataPosition)}>Decrease</button>
      </div>
    </div>
  );
};

export default Result;





    //   console.log(femaleItems);
    //   order =
    //   <div>
    //     <ul>
    //       <li>Male</li>
    //       {maleItems}}
    //     </ul>
    //     <ul>
    //       <li>Female</li>
    //       {femaleItems}
    //     </ul>
    //   </div>;
    // }
    // if (value === 'finalGenderedWords') {
    //   const genderKeys = Object.keys(data[value]);
    //   // data.finalGenderedWords.male
    //   console.log(genderKeys);
    //   order = genderKeys.map( (val: any) => {
    //     console.log(val, 'inside the genderLoop');
    //     console.log(data[value].male, 'inside the genderLoop');
    //     console.log(data[value][val], 'inside the genderLoop');
    //     let genderedLanguage;
    //     console.log(data[value][val].length, 'this is my length');
    //     if (data[value][val].length > 0) {
    //       console.log('do I make it into here');
    //       genderedLanguage = data[value][val].map( (word: any) => {
    //         console.log(word);
    //         return (
    //           <div>{word}</div>
    //         );
    //       } );
    //     } else {
    //       console.log('i think i am in here for the female part');
    //       return genderedLanguage = <div>No results.</div>;
    //     }
    //     return (
    //       <div>
    //         <div>
    //           {val}
    //         </div>
    //         <div>
    //           {genderedLanguage}
    //         </div>
    //       </div>
    //     );
    //   });
    // }