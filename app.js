const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const cors = require('cors');
const { loadConfigFile } = require('./config/utilities');
const { authenticate } = require('./config/auth');

const { AUTH_HEADER } = loadConfigFile('config');
const models = require('./models');
const schema = require('./schema');

const app = express();
app.use(cors());

const buildOptions = async (req) => {
  const user = await authenticate(req);
  return {
    context: { models, user },
    schema,
  };
};

app.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress(buildOptions),
);

app.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: '/graphql',
    passHeader: AUTH_HEADER,
  }),
);

const port = process.env.PORT || 5000;
app.listen(port, (error) => {
  if (error) console.error(`Error connecting to port ${port}\nError: ${error}`);
  else console.log(`Server is up and listening on port ${port}`);
});
