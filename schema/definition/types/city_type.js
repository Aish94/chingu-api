let CityType;
let GroupType;
let CountryType;
let UserType;

module.exports = () => [CityType, GroupType, CountryType, UserType];

GroupType = require('./group_type');
CountryType = require('./country_type');
UserType = require('./user_type');

CityType = `
  type City {
    id: ID!
    name: String!
    group: Group
    country: Country!
    users: [User!]!
  }
`;
