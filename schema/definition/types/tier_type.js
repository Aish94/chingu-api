let TierType;

module.exports = () => [TierType];

TierType = `
  type Tier {
    id: ID!
    level: Int!
    title: String!
  }
`;
