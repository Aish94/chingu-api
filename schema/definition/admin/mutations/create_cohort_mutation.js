const CohortInput = require('../../inputs/cohort_input');
const CohortType = require('../../types/cohort_type');

const CreateCohortMutation = `
  extend type Mutation {
    createCohort(title: String!, cohort_data: CohortInput): Cohort!
  }
`;

module.exports = () => [CreateCohortMutation, CohortInput, CohortType];
