import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FunctionComponent = () => {
  return (
      <div className='row'>
        <div className='col-12'>
          <h2 className='header'>Oops!</h2>
          <p>That page cannot be found.</p>
          <Link to='/' className='btn btn-primary'>Back to the beginning</Link>
        </div>
      </div>
  );
};

export default NotFound;
