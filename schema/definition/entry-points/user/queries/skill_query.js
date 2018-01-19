let SkillsQuery;
let Base;
let SkillType;

module.exports = () => [SkillsQuery, Base, SkillType];

Base = require('../../base');
SkillType = require('../../../types/user_type');

SkillsQuery = `
  extend type Query {
    skills: [Skill!]!
  }
`;
