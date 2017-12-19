const UserType = require('./user_type');
const CityType = require('./city_type');
const GroupType = require('./group_type');

const CountryType = `
  type Country {
    id: ID!
    name: String!
    users: [User!]!
    cities: [City!]!
    group: Group
  }
`;

module.exports = () => [CountryType, UserType, CityType, GroupType];
