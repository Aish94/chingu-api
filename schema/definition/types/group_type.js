const UserType = require('./user_type');

const GroupType = `
  type Group {
    id: ID!
    title: String!
    type: String!
    users: [User!]!
  }
`;

module.exports = () => [GroupType, UserType];
