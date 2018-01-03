let UserQuery;
let Base;
let UserType;

module.exports = () => [UserQuery, Base, UserType];

Base = require('../../base');
UserType = require('../../../types/user_type');

UserQuery = `
  extend type Query {
    user(username: String, user_id: ID, user_email: String): User
  }
`;
