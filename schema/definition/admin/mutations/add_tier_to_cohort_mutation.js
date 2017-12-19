const CohortTierType = require('../../types/cohort_tier_type');

const AddTierToCohortMutation = `
  extend type Mutation {
    addTierToCohort(cohort_id: ID!, tier_id: ID!): CohortTier!
  }
`;

module.exports = () => [AddTierToCohortMutation, CohortTierType];
