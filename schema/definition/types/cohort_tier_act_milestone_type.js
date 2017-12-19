const CohortTierActType = require('./cohort_tier_act_type');
const MilestoneType = require('./milestone_type');
const CohortTeamTierActType = require('./cohort_team_tier_act_type');

const CohortTierActMilestoneType = `
  type CohortTierActMilestone {
    id: ID!
    order_index: Int!
    act: CohortTierAct!
    milestone: Milestone!
    team_acts: [CohortTeamTierAct!]!
  }
`;

module.exports = () => [
  CohortTierActMilestoneType,
  CohortTierActType,
  MilestoneType,
  CohortTeamTierActType,
];
