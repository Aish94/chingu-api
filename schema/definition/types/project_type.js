let ProjectType;
let UserType;

module.exports = () => [ProjectType, UserType];

UserType = require('./user_type');

ProjectType = `
  type Project {
    id: ID!
    title: String!
    description: String
    project_url: String
    github_url: String
    users: [User!]!
  }
`;
