const CohortTierActMilestoneInput = `
  input CohortTierActMilestoneInput {
    cohort_tier_act_id: Int
    milestone_id: Int
    order_index: Int  
  }
`;

module.exports = () => [CohortTierActMilestoneInput];
