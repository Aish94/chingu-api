let CohortsQuery;
let Base;
let CohortType;

module.exports = () => [CohortsQuery, Base, CohortType];

Base = require('../../base');
CohortType = require('../../../types/cohort_type');

CohortsQuery = `
  extend type Query {
    cohorts(limit: Int = 10, offset: Int = 0): [Cohort!]!
  }
`;
