
import models, { connectDb } from './models';
import Server from './server';

const app = new Server().app;
const PORT: any = process.env.PORT || 3000;

const eraseDbonLoad = true;

connectDb().then(async () => {
  console.log('i have awoken');
});

app.listen( PORT, () => {
  console.log( `Express server listening on port ${PORT}` );
} );
