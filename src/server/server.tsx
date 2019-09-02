import bodyParser from 'body-parser';
import express from 'express';
import path from 'path';

import admin from './routes/admin/admin.route';
import choice from './routes/choice/choice.route';
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

    this.app.use(admin);
    this.app.use(data);
    this.app.use(choice);
    this.app.use(home);

    // end of routes

  }
}

export default Server;
