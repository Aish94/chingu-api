const CohortUserType = require('../../types/cohort_user_type');

const JoinCohortMutation = `
  extend type Mutation {
    joinCohort(cohort_id: ID!): CohortUser!
  }
`;

module.exports = () => [JoinCohortMutation, CohortUserType];
