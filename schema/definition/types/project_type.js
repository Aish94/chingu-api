const UserType = require('./user_type');

const ProjectType = `
  type Project {
    id: ID!
    title: String!
    description: String
    project_url: String
    github_url: String
    users: [User!]!
  }
`;

module.exports = () => [ProjectType, UserType];
