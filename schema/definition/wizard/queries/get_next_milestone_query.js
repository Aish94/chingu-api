const CohortTierActMilestoneType = require('../../types/cohort_tier_act_milestone_type');

const getNextMilestoneQuery = `
  extend type Query {
    getNextMilestone(
      slack_team_id: String!,
      slack_channel_id: String!,
      slack_user_id: String!
    ): [CohortTierActMilestone!]!
  }
`;

module.exports = () => [getNextMilestoneQuery, CohortTierActMilestoneType];
