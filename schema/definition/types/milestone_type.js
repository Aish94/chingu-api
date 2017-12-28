let MilestoneType;
let CohortTierActType;

module.exports = () => [MilestoneType, CohortTierActType];

CohortTierActType = require('./cohort_tier_act_type');

MilestoneType = `
  type Milestone {
    id: ID!
    title: String!
    description: String
    resource_url: String
    acts: [CohortTierAct!]!
  }
`;
