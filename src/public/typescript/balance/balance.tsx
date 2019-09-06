import * as React from 'react';

interface IBalance {
  male: number;
  female: number;
}
export const Balance = ( prop: IBalance ): JSX.Element => {

  const maleWords = prop.male;
  const femaleWords = prop.female;

  let male;
  let female;

  if (maleWords || femaleWords) {
    
    const lengthOne = maleWords;
    const lengthTwo = femaleWords;
    const total = lengthOne + lengthTwo;
    if (lengthOne !== 0) {
      const maleCount = (lengthOne / total) * 100;
      const fixedMale = maleCount.toFixed(2);
      male = fixedMale;
    } else {
      male = 0;
    }
    if (lengthTwo !== 0) {
      const femaleCount = (lengthTwo / total) * 100;

      const fixedFemale = femaleCount.toFixed(2);
      female = fixedFemale;
    } else {
      female = 0;
    }
  }

  return (
    <div>
      <h2>Gender balance</h2>
      <div>
        female: { female } | male: { male }
      </div>
    </div>
  );
};

export default Balance;
