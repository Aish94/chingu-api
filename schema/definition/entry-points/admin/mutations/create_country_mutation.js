let CreateCountryMutation;
let Base;
let CountryType;

module.exports = () => [CreateCountryMutation, Base, CountryType];

Base = require('../../base');
CountryType = require('../../../types/country_type');

CreateCountryMutation = `
  extend type Mutation {
    createCountry(name: String!): Country!
  }
`;
