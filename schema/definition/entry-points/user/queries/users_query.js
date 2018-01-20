let UserQuery;
let Base;
let UserType;

module.exports = () => [UserQuery, Base, UserType];

Base = require('../../base');
UserType = require('../../../types/user_type');

UserQuery = `
  extend type Query {
    users(search_string: String, limit: Int = 10): [User!]!
  }
`;
