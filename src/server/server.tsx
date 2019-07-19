import bodyParser from 'body-parser';
import express from 'express';
import * as path from 'path';

import React from 'react';
import { renderToString } from 'react-dom/server';
import { App } from '../public/Typescript/App/App';
import { htmlTemplate } from './htmlTemplate';

class Server {
  public app: express.Application;
  constructor() {
    this.app = express();
    this.config();
  }
  private config(): void {
    this.app.use( bodyParser.json() );
    this.app.use( '/', express.static( path.join(__dirname, '../../dist' ) ) );
    this.serverSideRender();
    // routes go here when I get them
  }
  private serverSideRender(): void {
    this.app.get('/', ( req: express.Request, res: express.Response ) => {
      const jsx = ( <App /> );
      const reactDom = renderToString( jsx );

      res.writeHead( 200, { 'Content-Type': 'text/html' } );
      res.end( htmlTemplate( reactDom ) );
    });
  }
}

export default Server;
