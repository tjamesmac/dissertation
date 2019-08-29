import React from 'react';

import { IOption } from './choice.interface';

const Option = ( prop: IOption ) => {
  const data = prop.data;
  const demo = prop.demo;
  const id = prop.id;
  const handleClick = prop.onClick;
  return (
    <div
      id={ id }
      onClick={ handleClick }
      className='option'
      data-demo={ demo }
      tabIndex={ 0 }
    >
      <p>{data}</p>
    </div>
  );
};

export default Option;
