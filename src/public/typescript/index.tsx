import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './app/app';

ReactDOM.hydrate(
  <BrowserRouter>
    <App/>
  </BrowserRouter>
  ,
  document.getElementById('app'));
