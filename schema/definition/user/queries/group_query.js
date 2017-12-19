const GroupType = require('../../types/group_type');

const GroupQuery = `
  extend type Query {
    group(group_id: ID!): Group
  }
`;

module.exports = () => [GroupQuery, GroupType];
