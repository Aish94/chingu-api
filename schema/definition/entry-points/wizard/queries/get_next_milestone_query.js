let GetNextMilestoneQuery;
let Base;
let CohortTierActMilestoneType;

module.exports = () => [GetNextMilestoneQuery, Base, CohortTierActMilestoneType];

Base = require('../../base');
CohortTierActMilestoneType = require('../../../types/cohort_tier_act_milestone_type');

GetNextMilestoneQuery = `
  extend type Query {
    getNextMilestone(
      slack_team_id: String!,
      slack_channel_id: String!,
      slack_user_id: String!
    ): [CohortTierActMilestone!]!
  }
`;
