let CohortTierActMilestoneType;
let CohortTierActType;
let MilestoneType;
let CohortTeamTierActType;

module.exports = () => [
  CohortTierActMilestoneType,
  CohortTierActType,
  MilestoneType,
  CohortTeamTierActType,
];

CohortTierActType = require('./cohort_tier_act_type');
MilestoneType = require('./milestone_type');
CohortTeamTierActType = require('./cohort_team_tier_act_type');

CohortTierActMilestoneType = `
  type CohortTierActMilestone {
    id: ID!
    order_index: Int!
    act: CohortTierAct!
    milestone: Milestone!
    team_acts: [CohortTeamTierAct!]!
  }
`;
