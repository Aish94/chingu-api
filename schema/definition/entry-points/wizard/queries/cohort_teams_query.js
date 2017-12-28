let CohortTeamsQuery;
let Base;
let CohortTeamType;

module.exports = () => [CohortTeamsQuery, Base, CohortTeamType];

Base = require('../../base');
CohortTeamType = require('../../../types/cohort_team_type');

CohortTeamsQuery = `
  extend type Query {
    cohortTeams(slack_team_id: String!): [CohortTeam!]!
  }
`;
