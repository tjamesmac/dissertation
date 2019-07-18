import express from 'express';
import * as path from 'path';

class Server {
  private MSG: string = 'THIS IS MY SERVER RUNNING';
  private app: express.Application = express();
  private PORT: number;
  constructor(portNumber: number) {
    this.PORT = portNumber;
  }
  public getApp() {
    this.getIndex();
    this.getDist();
    return this.app;
  }
  public serverMSG() {
    return `${this.MSG} ${this.PORT}`;
  }
  public getDist() {
    this.app.use('/', express.static(path.join(__dirname, '../../dist')));
  }
  public getIndex() {
    this.app.get('/', (req: express.Request, res: express.Response) => {
      res.sendFile(path.join(__dirname, '../../dist/index.html'));
    });
  }
}

export default Server;
