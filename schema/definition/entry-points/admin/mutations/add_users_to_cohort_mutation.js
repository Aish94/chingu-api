let AddUsersToCohortMutation;
let Base;
let CohortUserType;

module.exports = () => [AddUsersToCohortMutation, Base, CohortUserType];

Base = require('../../base');
CohortUserType = require('../../../types/cohort_user_type');

AddUsersToCohortMutation = `
  extend type Mutation {
    addUsersToCohort(cohort_id: Int!, user_data: String!): [CohortUser!]!
  }
`;
