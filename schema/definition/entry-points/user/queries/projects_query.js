let ProjectsQuery;
let Base;
let ProjectType;

module.exports = () => [ProjectsQuery, Base, ProjectType];

Base = require('../../base');
ProjectType = require('../../../types/project_type');

ProjectsQuery = `
  extend type Query {
    projects(title: String, skills: [String], limit: Int = 10, offset: Int = 0): [Project!]!
  }
`;
