import React from 'react';
import { Link } from 'react-router-dom';

export const Home: React.FunctionComponent = () => {
  return (
      <div className='row'>
        <div className='col-12'>
          <h2>Welcome!</h2>
          <p>
            This little program has been built to
             help see whether an advert is male or
             female biased.
          </p>
          <p>
            After clicking on the start button below,
             you will be presented with a text input area.
          </p>
          <p>
            You will be able to copy and paste text into
             the input area. After doing so, any adjectives
             that can be changed will be highlighted in green.
             Hovering over them will allow you to change the word.
          </p>
          <p>
            When you have submitted the changes to your advert, you will
             be able to choose from two previous posted adverts.
          </p>
        </div>
        <Link to='/main' className='btn btn-primary'>Start</Link>
      </div>
  );
};
