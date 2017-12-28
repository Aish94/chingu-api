let CohortTeamQuery;
let Base;
let CohortTeamType;

module.exports = () => [CohortTeamQuery, Base, CohortTeamType];

Base = require('../../base');
CohortTeamType = require('../../../types/cohort_team_type');

CohortTeamQuery = `
  extend type Query {
    cohortTeam(slack_team_id: String!, slack_channel_id: String!): CohortTeam!
  }
`;
