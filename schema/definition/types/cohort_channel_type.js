let CohortChannelType;
let CohortType;
let CohortTeamType;

module.exports = () => [CohortChannelType, CohortType, CohortTeamType];

CohortType = require('./cohort_type');
CohortTeamType = require('./cohort_team_type');

CohortChannelType = `
  type CohortChannel {
    id: ID!
    cohort: Cohort!
    team: CohortTeam
    title: String!
    slack_channel_id: String
    last_slack_scrape_ts: String
  }
`;
