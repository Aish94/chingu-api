const ProjectType = require('../../types/project_type');

const ProjectsQuery = `
  extend type Query {
    projects(limit: Int = 10, offset: Int = 0): [Project!]!
  }
`;

module.exports = () => [ProjectsQuery, ProjectType];
