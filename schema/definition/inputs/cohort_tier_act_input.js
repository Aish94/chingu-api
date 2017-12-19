const CohortTierActInput = `
  input CohortTierActInput {
    cohort_id: Int
    tier_id: Int
    title: String
    order_index: Int
    repeatable: Boolean
  }
`;

module.exports = () => [CohortTierActInput];
