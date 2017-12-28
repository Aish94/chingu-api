let CohortTeamTierActMilestoneType;
let CohortTeamTierActType;
let CohortTierActMilestoneType;

module.exports = () => [
  CohortTeamTierActMilestoneType,
  CohortTeamTierActType,
  CohortTierActMilestoneType,
];

CohortTeamTierActType = require('./cohort_team_tier_act_type');
CohortTierActMilestoneType = require('./cohort_tier_act_milestone_type');

CohortTeamTierActMilestoneType = `
  type CohortTeamTierActMilestone {
    id: ID!
    team_act: CohortTeamTierAct!
    act_milestone: CohortTierActMilestone!
  }
`;
