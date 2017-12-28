let CountryQuery;
let Base;
let CountryType;

module.exports = () => [CountryQuery, Base, CountryType];

Base = require('../../base');
CountryType = require('../../../types/country_type');

CountryQuery = `
  extend type Query {
    country(country_id: ID!): Country
  }
`;
