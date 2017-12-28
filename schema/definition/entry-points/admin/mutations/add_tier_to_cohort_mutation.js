let AddTierToCohortMutation;
let Base;
let CohortTierType;

module.exports = () => [AddTierToCohortMutation, Base, CohortTierType];

Base = require('../../base');
CohortTierType = require('../../../types/cohort_tier_type');

AddTierToCohortMutation = `
  extend type Mutation {
    addTierToCohort(cohort_id: ID!, tier_id: ID!): CohortTier!
  }
`;
