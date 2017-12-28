let CityQuery;
let Base;
let CityType;

module.exports = () => [CityQuery, Base, CityType];

Base = require('../../base');
CityType = require('../../../types/city_type');

CityQuery = `
  extend type Query {
    city(city_id: ID!): City
  }
`;
