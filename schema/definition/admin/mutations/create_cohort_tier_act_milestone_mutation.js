const CohortTierActMilestoneInput = require('../../inputs/cohort_tier_act_milestone_input');
const CohortTierActMilestoneType = require('../../types/cohort_team_tier_act_milestone_type');

const CreateCohortTierActMilestoneMutation = `
  extend type Mutation {
    createCohortTierActMilestone(
      act_milestone_data: CohortTierActMilestoneInput!
    ): CohortTierActMilestone!
  }
`;

module.exports = () => [
  CreateCohortTierActMilestoneMutation,
  CohortTierActMilestoneInput,
  CohortTierActMilestoneType,
];
