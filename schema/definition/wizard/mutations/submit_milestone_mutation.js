const CohortTeamTierActMilestoneType = require('../../types/cohort_team_tier_act_milestone_type');

const SubmitMilestoneMutation = `
  extend type Mutation {
    submitMilestone(
      slack_team_id: String!,
      slack_channel_id: String!,
      slack_user_id: String!,
      cohort_tier_act_milestone_id: Int!
    ): CohortTeamTierActMilestone!
  }
`;

module.exports = () => [SubmitMilestoneMutation, CohortTeamTierActMilestoneType];
