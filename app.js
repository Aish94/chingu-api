const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const cors = require('cors');
const mongoose = require('mongoose');
const { getConfigPath } = require('./config/utilities');
const { authenticate, authenticateWizard } = require('./config/auth');

const { AUTH_HEADER, MONGO_URL, ALLOW_GRAPHIQL } = require(getConfigPath('config'));
const models = require('./models');
const schema = require('./schema');

const app = express();

// configure CORS for accessing the prod and dev domains
const corsOptions = {
  origin: [
    'https://chingu.io',
    'https://chingu-dev-network.firebaseapp.com',
    /^http:\/\/localhost(:[0-9]{0,4})?\/?$/,
  ],
  methods: ['GET', 'PUT', 'POST'],
  exposedHeaders: ['Access-Control-Allow-Origin'],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress(async (req) => {
    const jwt_object = await authenticate(req);
    const is_wizard = authenticateWizard(req);
    return {
      context: { models, jwt_object, is_wizard },
      schema,
      debug: !!ALLOW_GRAPHIQL,
      // TODO: make use of the 'formatError' and 'formatResponse' options
      // https://www.apollographql.com/docs/apollo-server/setup.html#graphqlOptions
    };
  }),
);

if (ALLOW_GRAPHIQL) {
  app.use(
    '/graphiql',
    graphiqlExpress({
      endpointURL: 'https://chingu-api-dev.herokuapp.com/graphql',
      passHeader: AUTH_HEADER,
    }),
  );
}

const port = process.env.PORT || 5000;
app.listen(port, (error) => {
  if (error) console.error(`Error connecting to port ${port}\nError: ${error}`);
  else console.log(`Server is up and listening on port ${port}`);
});

// --------------------- MONGO DATABASE --------------------- //
mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URL, { useMongoClient: true }, (error) => {
  if (error) console.log(`Error connecting to database\n${error}`);
  else console.log('Successfully connected to the database');
});

