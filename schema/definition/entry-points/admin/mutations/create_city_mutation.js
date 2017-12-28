let CreateCityMutation;
let Base;
let CityType;

module.exports = () => [CreateCityMutation, Base, CityType];

Base = require('../../base');
CityType = require('../../../types/city_type');

CreateCityMutation = `
  extend type Mutation {
    createCity(country_id: ID!, name: String!): City!
  }
`;
