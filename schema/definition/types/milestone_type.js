const CohortTierActType = require('./cohort_tier_act_type');

const MilestoneType = `
  type Milestone {
    id: ID!
    title: String!
    description: String
    resource_url: String
    acts: [CohortTierAct!]!
  }
`;

module.exports = () => [MilestoneType, CohortTierActType];
