let CreateTierMutation;
let Base;
let TierType;

module.exports = () => [CreateTierMutation, Base, TierType];

Base = require('../../base');
TierType = require('../../../types/tier_type');

CreateTierMutation = `
  extend type Mutation {
    createTier(level: Int!, title: String!): Tier!
  }
`;
