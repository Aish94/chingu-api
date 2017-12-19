const CohortType = require('../../types/cohort_type');

const CohortsQuery = `
  extend type Query {
    cohorts(limit: Int = 10, offset: Int = 0): [Cohort!]!
  }
`;

module.exports = () => [CohortsQuery, CohortType];
