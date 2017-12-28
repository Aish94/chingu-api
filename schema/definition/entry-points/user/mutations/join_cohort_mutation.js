let JoinCohortMutation;
let Base;
let CohortUserType;

module.exports = () => [JoinCohortMutation, Base, CohortUserType];

Base = require('../../base');
CohortUserType = require('../../../types/cohort_user_type');

JoinCohortMutation = `
  extend type Mutation {
    joinCohort(cohort_id: ID!): CohortUser!
  }
`;
