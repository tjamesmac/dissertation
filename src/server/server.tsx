import bodyParser from 'body-parser';
import express from 'express';
import * as path from 'path';

import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../public/Typescript/App/App';
import { htmlTemplate } from './htmlTemplate';
import models from './models';
import User from './models/user/user';
import data from './routes/data/data.route';
import home from './routes/home/home.route';

class Server {
  public app: express.Application;
  constructor() {
    this.app = express();
    this.config();
  }
  private config(): void {
    this.app.use( bodyParser.json() );
    this.app.use( '/', express.static( path.join(__dirname, '../../dist' ) ) );
    // routes go here when I get them

    this.app.use(data);
    this.app.use(home);
    
    // end of routes

  }
}

export default Server;
