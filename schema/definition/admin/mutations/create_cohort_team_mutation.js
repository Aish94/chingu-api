const CohortTeamType = require('../../types/cohort_team_type');

const CreateCohortTeamMutation = `
  extend type Mutation {
    createCohortTeam(cohort_id: ID!, cohort_tier_id: Int!): CohortTeam!
  }
`;

module.exports = () => [CreateCohortTeamMutation, CohortTeamType];
