const express = require('express');
const path = require('path');
const app = express();
const PORT: number = 3000;

const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

const root = { hello: () => 'Hello world!' };

app.use('/', express.static(path.join(__dirname, '../../dist')));
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.get('/', (req: Request, res: any) => {
  res.sendFile(path.join(__dirname, '../../dist/index.html'));
});
app.listen(PORT, () => console.log(`example app listening on ${PORT}`));
