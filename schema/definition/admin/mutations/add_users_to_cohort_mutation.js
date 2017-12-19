const CohortUserType = require('../../types/cohort_user_type');

const AddUsersToCohortMutation = `
  extend type Mutation {
    addUsersToCohort(cohort_id: Int!, user_data: String!): [CohortUser!]!
  }
`;

module.exports = () => [AddUsersToCohortMutation, CohortUserType];
