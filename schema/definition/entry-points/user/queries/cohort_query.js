let CohortQuery;
let Base;
let CohortType;

module.exports = () => [CohortQuery, Base, CohortType];

Base = require('../../base');
CohortType = require('../../../types/cohort_type');

CohortQuery = `
  extend type Query {
    cohort(cohort_id: ID!): Cohort
  }
`;
