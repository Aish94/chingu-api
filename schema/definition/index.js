const Scalars = require('./scalars');
const Enums = require('./enums');
const Inputs = require('./inputs');
const Types = require('./types');
const EntryPoints = require('./entry-points');


module.exports = [
  ...Scalars,
  ...Enums,
  ...Inputs,
  ...Types,
  ...EntryPoints,
];
