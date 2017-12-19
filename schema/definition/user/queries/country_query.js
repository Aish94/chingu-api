const CountryType = require('../../types/country_type');

const CountryQuery = `
  extend type Query {
    country(country_id: ID!): Country
  }
`;

module.exports = () => [CountryQuery, CountryType];
