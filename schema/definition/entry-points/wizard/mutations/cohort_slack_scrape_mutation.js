let CohortSlackScrape;
let Base;

module.exports = () => [CohortSlackScrape, Base];

Base = require('../../base');

// return type?
CohortSlackScrape = `
  extend type Mutation {
    cohortSlackScrape(slack_team_id:String!, slack_user_id:String!): Boolean
  }
`;
