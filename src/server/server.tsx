import bodyParser from 'body-parser';
import express from 'express';
import * as path from 'path';

class Server {
  private MSG: string = 'THIS IS MY SERVER RUNNING';
  public app: express.Application;
  constructor() {
    this.app = express();
    this.config();
  }
  // public getApp() {
  //   this.getIndex();
  //   this.getDist();
  //   return this.app;
  // }
  private config(): void {
    this.app.use(bodyParser.json());
    this.app.use('/', express.static(path.join(__dirname, '../../dist')));
    this.app.get('/', (req: express.Request, res: express.Response) => {
      res.sendFile(path.join(__dirname, '../../dist/index.html'));
    });
  }
}

export default new Server().app;
