import * as React from 'react';
import { Home } from '../home/home';
import { Main } from '../main/main';

const App = () => {
  return (
    <div>
    <div className='container'>
      <div className='row'>
        <div className='col-12'>
          <h1>Gender Neutral</h1>
        </div>
      </div>
    </div>
      <Home name='thomas' />
    </div>
  );
};

export default App;
