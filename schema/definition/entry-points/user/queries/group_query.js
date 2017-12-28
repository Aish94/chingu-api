let GroupQuery;
let Base;
let GroupType;

module.exports = () => [GroupQuery, Base, GroupType];

Base = require('../../base');
GroupType = require('../../../types/group_type');

GroupQuery = `
  extend type Query {
    group(group_id: ID!): Group
  }
`;
