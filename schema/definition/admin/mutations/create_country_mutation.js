const CountryType = require('../../types/country_type');

const CreateCountryMutation = `
  extend type Mutation {
    createCountry(name: String!): Country!
  }
`;

module.exports = () => [CreateCountryMutation, CountryType];
