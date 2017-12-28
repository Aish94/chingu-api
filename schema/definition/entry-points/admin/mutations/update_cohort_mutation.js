let UpdateCohortMutation;
let Base;
let CohortInput;
let CohortType;

module.exports = () => [UpdateCohortMutation, Base, CohortInput, CohortType];

Base = require('../../base');
CohortInput = require('../../../inputs/cohort_input');
CohortType = require('../../../types/cohort_type');

UpdateCohortMutation = `
  extend type Mutation {
    updateCohort(cohort_id: ID!, cohort_data: CohortInput!): Cohort!
  }
`;
