const GroupType = require('./group_type');
const CountryType = require('./country_type');
const UserType = require('./user_type');

const CityType = `
  type City {
    id: ID!
    name: String!
    group: Group
    country: Country!
    users: [User!]!
  }
`;

module.exports = () => [CityType, GroupType, CountryType, UserType];
