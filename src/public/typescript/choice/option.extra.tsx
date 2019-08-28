import React from 'react';

import { IOption } from './choice.interface';

const Option = ( prop: IOption ) => {
  const data = prop.data;
  const demo = prop.demo;
  return (
    <div
      className='option'
      data-demo={ demo }
      tabIndex={ 0 }
    >
      <p>{data}</p>
    </div>
  );
};

export default Option;
