let CohortSlackScrape;
let Base;

module.exports = () => [CohortSlackScrape, Base];

Base = require('../../base');

// return type?
CohortSlackScrape = `
  extend type Mutation {
    cohortSlackScrape(cohort_id:ID!): Boolean
  }
`;
