import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';

import Admin from '../admin/admin';
import Choice from '../choice/choice';
import { Final } from '../final/final';
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
          <Link className='link link-primary' to='/choice'>Choice</Link>
        </div>
      </div>
      <Switch>
        <Route path='/' exact render={( props ) => <Home name='thomas'/> } />
        <Route path='/main' component={ Main } />
        <Route path='/choice' component={ Choice } />
        <Route path='/final' component={ Final } />
        <Route path='/admin' component={ Admin } />
        <Route component={ NotFound } />
      </Switch>
    </div>
  );
};

export default App;
