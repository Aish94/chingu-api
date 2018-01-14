let ProjectType;
let UserType;
let SkillType;

module.exports = () => [ProjectType, UserType, SkillType];

UserType = require('./user_type');
SkillType = require('./skill_type');

ProjectType = `
  type Project {
    id: ID!
    title: String!
    description: String
    project_url: String
    github_url: String
    users: [User!]!
    skills: [Skill!]!
  }
`;
