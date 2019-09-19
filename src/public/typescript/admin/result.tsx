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
export const ResultData = ( prop: any ): JSX.Element => {
  const wholeData = prop.data;
  
  const [ dataPosition, setDataPosition ] = React.useState(wholeData.length - 1);
  const data = wholeData[dataPosition];
  const keys = Object.keys(data);
  

  const handlePositionIncrease = ( position: number ) => {
    const currentPosition = position;
  
    if (currentPosition < wholeData.length - 1) {
      setDataPosition(currentPosition + 1);
  
    }

  };
  const handlePositionDecrease = ( position: number ) => {
    const currentPosition = position;
    if (currentPosition >= 0 && currentPosition ) {
      setDataPosition(currentPosition - 1);
  
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
    <ul>
      <li className='data-item'>
        <div className='data-title'>Initial String</div>
        <div className='data-result'>{data.originalString}</div>
      </li>
      <li className='data-item'>
        <div className='data-title'>New String</div>
        <div className='data-result'>{data.newString}</div>
      </li>
      <li className='data-item'>
        <div className='data-title'>Order Of Words Changed</div>
        {orderOfWords}
      </li>
      <li className='data-item'>
        <div className='data-title'>Length of Submission</div>
        {data.length}
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
    </ul>
  </div>;

  return (
    <div>
      {dataPosition}
      {formattedData}
      <div>
        <button
          className='btn btn-primary'
          onClick={() => handlePositionDecrease(dataPosition)}
          >
            Decrease
        </button>
        <button
          className='btn btn-primary'
          onClick={() => handlePositionIncrease(dataPosition)}
          >
            Increase
        </button>
      </div>
    </div>
  );
};
export const ResultFinal = ( prop: any ): JSX.Element => {
  const wholeData = prop.data;
  
  const [ dataPosition, setDataPosition ] = React.useState(wholeData.length - 1);
  const data = wholeData[dataPosition];
  


  const handlePositionIncrease = ( position: number ) => {
    const currentPosition = position;
    
    if (currentPosition < wholeData.length - 1) {
      setDataPosition(currentPosition + 1);
      
    }

  };
  const handlePositionDecrease = ( position: number ) => {
    const currentPosition = position;
    if (currentPosition >= 0 && currentPosition ) {
      setDataPosition(currentPosition - 1);
      
    }
  };

  let demoMatch = data.demographicMatch;
  if (demoMatch === true) {
    demoMatch = 'true';
  } else {
    demoMatch = 'false';
  }
  const originalSubLength = data.originalSubmissionLength;
  const finalSubLength = data.finalSubmissionLength;
  const orderChangeLength = data.orderChangeLength;
  const totalChangeableWords = data.lengthOfAdjectivesPossible;
  const maleItemsIn = genderedResultMaker(data.initialGenderedWords.male);
  const femaleItemsIn = genderedResultMaker(data.initialGenderedWords.female);
  const maleItemsFi = genderedResultMaker(data.finalGenderedWords.male);
  const femaleItemsFi = genderedResultMaker(data.finalGenderedWords.female);

  const formattedData =
  <div>
    <ul>
      <li className='data-item'>
        <div className='data-title'>Demographic Match</div>
        <div className='data-result'>{demoMatch}</div>
      </li>
      <li className='data-item'>
        <div className='data-title'>Original submission length</div>
        <div className='data-result'>{originalSubLength}</div>
      </li>
      <li className='data-item'>
        <div className='data-title'>Final submission length</div>
        <div className='data-result'>{finalSubLength}</div>
      </li>
      <li className='data-item'>
        <div className='data-title'>Final order change length</div>
        <div className='data-result'>{orderChangeLength}</div>
      </li>
      <li className='data-item'>
        <div className='data-title'>Total changeable words</div>
        <div className='data-result'>{totalChangeableWords}</div>
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
    </ul>
  </div>;
 
  return (
    <div>
      {dataPosition}
      {formattedData}
      <div>
      <button
          className='btn btn-primary'
          onClick={() => handlePositionDecrease(dataPosition)}
          >
            Decrease
        </button>
      <button
          className='btn btn-primary'
          onClick={() => handlePositionIncrease(dataPosition)}
          >
            Increase
        </button>
      </div>
    </div>
  );
};
export const ResultWords = ( prop: any ): JSX.Element => {
  const data = prop.data;
  
  if (data) {
    console.log(data, 'words go here');
  }
  let female;
  let male;
  for ( const element of data ) {
    if ( element.demographic === 'female' ) {
      const words = Object.keys(element.words);
      female = words.map((value: any, index: number ) => {
        const word = value;
        const num = element.words[word];

        return (
          <div key={index}>
            <ul>
              <li>
              {word} : {num}
              </li>
            </ul>
          </div>
        );
      } );
    } else {
      const words = Object.keys(element.words);
      
      male = words.map((value: any, index: number ) => {
        const word = value;
        const num = element.words[word];

        return (
          <div key={index}>
            <ul>
              <li>
              {word} : {num}
              </li>
            </ul>
          </div>
        );
      } );
    }
  }

  return (
    <div>
      <div className='data-item'>
        <div className='data-result-list'>
          <div>Female</div>
          <div>{female}</div>
        </div>
        <div className='data-result-list'>
          <div>Male</div>
          <div>{male}</div>
        </div>
      </div>
    </div>
  );
};



export const Result = ( prop: any ): JSX.Element => {
  const data = prop.data;
  const final = prop.final;
  const words = prop.words;

  return (
    <div className='result'>
      <p>This is called my Result component</p>
      <ResultData data={data} />
      <ResultFinal data={ final }/>
      <ResultWords data={ words }/>
    </div>
  );
};

export default Result;
