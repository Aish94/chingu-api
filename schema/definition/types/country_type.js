let CountryType;
let UserType;
let CityType;
let GroupType;

module.exports = () => [CountryType, UserType, CityType, GroupType];

UserType = require('./user_type');
CityType = require('./city_type');
GroupType = require('./group_type');

CountryType = `
  type Country {
    id: ID!
    name: String!
    users: [User!]!
    cities: [City!]!
    group: Group
  }
`;
