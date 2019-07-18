
import path from 'path';
import Server from './server';

const server: any = new Server(3000);
const app = server.getApp();

app.listen(server.PORT, () => {
  console.log(server.serverMSG());
});
