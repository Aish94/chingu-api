const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const cors = require('cors');
const { getConfigPath } = require('./config/utilities');
const { authenticate } = require('./config/auth');

const { AUTH_HEADER, MONGO_URL } = require(getConfigPath('config'));
const models = require('./models');
const schema = require('./schema');
const mongoose = require('mongoose');

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

const buildOptions = async (req) => {
  const jwt_object = await authenticate(req);
  return {
    context: { models, jwt_object },
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

// --------------------- MONGO DATABASE --------------------- //
mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URL, { useMongoClient: true }, (error) => {
  if (error) console.log(`Error connecting to database\n${error}`);
  else console.log('Successfully connected to the database');
});

