import * as React from 'react';
import { Link } from 'react-router-dom';

export const Final = ( ): JSX.Element => {
  return (
    <div className='col-12'>
      <div className='info'>
        <p>Thank you for taking part.</p>
      </div>
        <Link to='/' className='btn btn-primary'>Back to the beginning</Link>
    </div>
  );
};

export default Final;
