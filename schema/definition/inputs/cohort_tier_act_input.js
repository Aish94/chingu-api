let CohortTierActInput;

module.exports = () => [CohortTierActInput];

CohortTierActInput = `
  input CohortTierActInput {
    cohort_id: ID
    tier_id: ID
    title: String
    order_index: Int
    repeatable: Boolean
  }
`;
