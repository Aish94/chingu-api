const CohortTeamType = require('../../types/cohort_team_type');

const CohortTeamQuery = `
  extend type Query {
    cohortTeam(slack_team_id: String!, slack_channel_id: String!): CohortTeam!
  }
`;

module.exports = () => [CohortTeamQuery, CohortTeamType];
