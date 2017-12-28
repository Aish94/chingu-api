let UpdateCohortUserMutation;
let Base;
let CohortUserInput;
let CohortUserType;

module.exports = () => [UpdateCohortUserMutation, Base, CohortUserInput, CohortUserType];

Base = require('../../base');
CohortUserInput = require('../../../inputs/cohort_user_input');
CohortUserType = require('../../../types/cohort_user_type');

UpdateCohortUserMutation = `
  extend type Mutation {
    updateCohortUser(cohort_user_id: ID!, cohort_user_data: CohortUserInput!): CohortUser!
  }
`;
