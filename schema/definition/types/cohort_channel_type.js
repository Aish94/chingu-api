let CohortType;
let CohortChannelType;

module.exports = () => [CohortType, CohortChannelType];

CohortType = require('./cohort_type');

CohortChannelType = `
  type CohortChannel {
    id: ID!
    cohort: Cohort!
    title: String!
    slack_channel_id: String
    last_slack_scrape_ts: String
  }
`;
