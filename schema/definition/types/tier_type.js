const TierType = `
  type Tier {
    id: ID!
    level: Int!
    title: String!
  }
`;

module.exports = () => [TierType];
