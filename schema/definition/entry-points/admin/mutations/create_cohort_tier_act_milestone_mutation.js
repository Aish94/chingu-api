let CreateCohortTierActMilestoneMutation;
let Base;
let CohortTierActMilestoneInput;
let CohortTierActMilestoneType;

module.exports = () => [
  CreateCohortTierActMilestoneMutation,
  Base,
  CohortTierActMilestoneInput,
  CohortTierActMilestoneType,
];

Base = require('../../base');
CohortTierActMilestoneInput = require('../../../inputs/cohort_tier_act_milestone_input');
CohortTierActMilestoneType = require('../../../types/cohort_team_tier_act_milestone_type');

CreateCohortTierActMilestoneMutation = `
  extend type Mutation {
    createCohortTierActMilestone(
      act_milestone_data: CohortTierActMilestoneInput!
    ): CohortTierActMilestone!
  }
`;
