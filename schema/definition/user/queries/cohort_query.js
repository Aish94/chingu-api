const CohortType = require('../../types/cohort_type');

const CohortQuery = `
  extend type Query {
    cohort(cohort_id: ID!): Cohort
  }
`;

module.exports = () => [CohortQuery, CohortType];
