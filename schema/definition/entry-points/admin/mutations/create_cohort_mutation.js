let CreateCohortMutation;
let Base;
let CohortInput;
let CohortType;

module.exports = () => [CreateCohortMutation, Base, CohortInput, CohortType];

Base = require('../../base');
CohortInput = require('../../../inputs/cohort_input');
CohortType = require('../../../types/cohort_type');

CreateCohortMutation = `
  extend type Mutation {
    createCohort(title: String!, cohort_data: CohortInput): Cohort!
  }
`;
