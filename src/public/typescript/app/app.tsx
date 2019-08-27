import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';

import { Home } from '../home/home';
import { Main } from '../main/main';
import { NotFound } from '../notFound/notFound';

const App = () => {
  return (
    <div>
    <div className='container'>
      <div className='row'>
        <div className='col-12'>
          <h1>Gender Neutral</h1>
        </div>
      </div>
      <div className='row'>
        <div className='col-3'>
          <Link to='/'>Home</Link>
        </div>
        <div className='col-3'>
        <Link to='/main'>Main</Link>
        </div>
      </div>
    </div>
      <Switch>
        <Route path='/' exact render={( props ) => <Home name='thomas'/> } />
        <Route path='/main' component={ Main } />
        <Route component={ NotFound } />
      </Switch>
    </div>
  );
};

export default App;
