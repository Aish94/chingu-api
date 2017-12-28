let CohortTierActType;
let CohortTierType;
let CohortTierActMilestoneType;
let CohortTeamType;
let CohortTeamTierActType;

module.exports = () => [
  CohortTierActType,
  CohortTierType,
  CohortTierActMilestoneType,
  CohortTeamType,
  CohortTeamTierActType,
];

CohortTierType = require('./cohort_tier_type');
CohortTierActMilestoneType = require('./cohort_tier_act_milestone_type');
CohortTeamType = require('./cohort_team_type');
CohortTeamTierActType = require('./cohort_team_tier_act_type');

CohortTierActType = `
  type CohortTierAct {
    id: ID!
    title: String!
    order_index: Int!
    repeatable: Boolean!
    cohort_tier: CohortTier!
    act_milestones: [CohortTierActMilestone!]!
    teams: [CohortTeam!]!
    team_acts: [CohortTeamTierAct!]!
  }
`;
