let CohortChannelType;
let CohortType;
let CohortTeamType;
let CohortChannelTypeEnum;

module.exports = () => [CohortChannelType, CohortType, CohortTeamType, CohortChannelTypeEnum];

CohortType = require('./cohort_type');
CohortTeamType = require('./cohort_team_type');
CohortChannelTypeEnum = require('../enums/cohort_channel_type_enum');

CohortChannelType = `
  type CohortChannel {
    id: ID!
    cohort: Cohort!
    team: CohortTeam
    channel_type: _CohortChannelType!
    public_channel: Boolean!
    title: String!
    slack_channel_id: String
    last_slack_scrape_ts: String
  }
`;
