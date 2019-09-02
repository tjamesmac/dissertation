import * as React from 'react';
import { Link } from 'react-router-dom';

export const Final = ( ): JSX.Element => {
  return (
    <div className='info'>
      <p>Thank you for taking part.</p>
      <Link to='/' className='btn btn-primary'>Back to the beginning</Link>
    </div>
  );
};

export default Final;
