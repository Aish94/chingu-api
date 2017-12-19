const CityType = require('../../types/city_type');

const CityQuery = `
  extend type Query {
    city(city_id: ID!): City
  }
`;

module.exports = () => [CityQuery, CityType];
