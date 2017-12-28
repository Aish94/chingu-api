let GroupType;
let UserType;

module.exports = () => [GroupType, UserType];

UserType = require('./user_type');

GroupType = `
  type Group {
    id: ID!
    title: String!
    type: String!
    users: [User!]!
  }
`;
