const CohortUserInput = require('../../inputs/cohort_user_input');
const CohortUserType = require('../../types/cohort_user_type');

const UpdateCohortUserMutation = `
  extend type Mutation {
    updateCohortUser(cohort_user_id: ID!, cohort_user_data: CohortUserInput!): CohortUser!
  }
`;

module.exports = () => [UpdateCohortUserMutation, CohortUserInput, CohortUserType];
