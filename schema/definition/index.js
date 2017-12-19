const Scalars = require('./scalars');
const Enums = require('./enums');
const Inputs = require('./inputs');
const Types = require('./types');
const Wizard = require('./wizard');
const Admin = require('./admin');
const User = require('./user');

const RootQuery = `
  type RootQuery {}
`;

const RootMutation = `
  type RootMutation {}
`;

const SchemaDefinition = `
  schema {
    query: RootQuery
    mutation: RootMutation
  }
`;

module.exports = [
  SchemaDefinition,
  RootQuery,
  RootMutation,
  Scalars(),
  Enums(),
  Inputs(),
  Types(),
  Wizard(),
  Admin(),
  User(),
];
