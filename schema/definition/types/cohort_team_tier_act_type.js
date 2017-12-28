let CohortTeamTierActType;
let CohortTeamType;
let CohortTierActType;
let CohortTierActMilestoneType;

module.exports = () => [
  CohortTeamTierActType,
  CohortTeamType,
  CohortTierActType,
  CohortTierActMilestoneType,
];

CohortTeamType = require('./cohort_team_type');
CohortTierActType = require('./cohort_tier_act_type');
CohortTierActMilestoneType = require('./cohort_tier_act_milestone_type');

CohortTeamTierActType = `
  type CohortTeamTierAct {
    id: ID!
    repetition: Int!
    team: CohortTeam!
    act: CohortTierAct!
    completed_act_milestones: [CohortTierActMilestone!]!
  }
`;
