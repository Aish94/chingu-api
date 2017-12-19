const CohortInput = require('../../inputs/cohort_input');
const CohortType = require('../../types/cohort_type');

const UpdateCohortMutation = `
  extend type Mutation {
    updateCohort(cohort_id: ID!, cohort_data: CohortInput!): Cohort!
  }
`;

module.exports = () => [UpdateCohortMutation, CohortInput, CohortType];
