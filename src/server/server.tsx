import bodyParser from 'body-parser';
import express from 'express';
import * as path from 'path';

class Server {
  public app: express.Application;
  constructor() {
    this.app = express();
    this.config();
  }
  private config(): void {
    this.app.use(bodyParser.json());
    this.app.use('/', express.static(path.join(__dirname, '../../dist')));
    this.app.get('/', (req: express.Request, res: express.Response) => {
      res.sendFile(path.join(__dirname, '../../dist/index.html'));
    });
    // routes go here when I get them
  }
}

export default Server;
