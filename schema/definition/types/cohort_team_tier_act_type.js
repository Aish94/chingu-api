const CohortTeamType = require('./cohort_team_type');
const CohortTierActType = require('./cohort_tier_act_type');
const CohortTierActMilestoneType = require('./cohort_tier_act_milestone_type');

const CohortTeamTierActType = `
  type CohortTeamTierAct {
    id: ID!
    repetition: Int!
    team: CohortTeam!
    act: CohortTierAct!
    completed_act_milestones: [CohortTierActMilestone!]!
  }
`;

module.exports = () => [
  CohortTeamTierActType,
  CohortTeamType,
  CohortTierActType,
  CohortTierActMilestoneType,
];
