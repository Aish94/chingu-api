const CohortTeamType = require('../../types/cohort_team_type');

const CohortTeamsQuery = `
  extend type Query {
    cohortTeams(slack_team_id: String!): [CohortTeam!]!
  }
`;

module.exports = () => [CohortTeamsQuery, CohortTeamType];
