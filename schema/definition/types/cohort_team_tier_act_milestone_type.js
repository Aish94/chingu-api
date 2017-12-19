const CohortTeamTierActType = require('./cohort_team_tier_act_type');
const CohortTierActMilestoneType = require('./cohort_tier_act_milestone_type');

const CohortTeamTierActMilestoneType = `
  type CohortTeamTierActMilestone {
    id: ID!
    team_act: CohortTeamTierAct!
    act_milestone: CohortTierActMilestone!
  }
`;

module.exports = () => [
  CohortTeamTierActMilestoneType,
  CohortTeamTierActType,
  CohortTierActMilestoneType,
];
