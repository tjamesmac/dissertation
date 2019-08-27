import React from 'react';
import { IHelloProps } from './home.interface';

export const Hello: React.FunctionComponent<{name: string}> = (props: IHelloProps) => {
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-12'>
          <h1 className='header'>Hello, {props.name}. Welcome back!</h1>
        </div>
      </div>
    </div>
  );
};
