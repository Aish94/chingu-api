const CityType = require('../../types/city_type');

const CreateCityMutation = `
  extend type Mutation {
    createCity(country_id: ID!, name: String!): City!
  }
`;

module.exports = () => [CreateCityMutation, CityType];
