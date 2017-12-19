const TierType = require('../../types/tier_type');

const CreateTierMutation = `
  extend type Mutation {
    createTier(level: Int!, title: String!): Tier!
  }
`;

module.exports = () => [CreateTierMutation, TierType];
