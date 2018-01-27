let CreateCohortTeamMutation;
let Base;
let CohortTeamType;

module.exports = () => [CreateCohortTeamMutation, Base, CohortTeamType];

Base = require('../../base');
CohortTeamType = require('../../../types/cohort_team_type');

CreateCohortTeamMutation = `
  extend type Mutation {
    createCohortTeam(cohort_id: ID!, cohort_tier_id: ID!): CohortTeam!
  }
`;
