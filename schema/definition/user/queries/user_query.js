const UserType = require('../../types/user_type');

const UserQuery = `
  extend type Query {
    user(username: String, user_id: ID): User
  }
`;

module.exports = () => [UserQuery, UserType];
