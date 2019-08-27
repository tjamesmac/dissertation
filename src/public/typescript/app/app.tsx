import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';

import Choice from '../choice/choice';
import { Home } from '../home/home';
import { Main } from '../main/main';
import NotFound from '../notFound/notFound';

const App = () => {
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-12'>
          <h1>Gender Neutral</h1>
        </div>
      </div>
      <div className='row'>
        <div className='col-3'>
          <Link className='link link-primary' to='/'>Home</Link>
        </div>
        <div className='col-3'>
          <Link className='link link-primary' to='/main'>Main</Link>
        </div>
      </div>
      <Switch>
        <Route path='/' exact render={( props ) => <Home name='thomas'/> } />
        <Route path='/main' component={ Main } />
        <Route path='/results' component={ Choice } />
        <Route component={ NotFound } />
      </Switch>
    </div>
  );
};

export default App;
