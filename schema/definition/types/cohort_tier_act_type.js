const CohortTierType = require('./cohort_tier_type');
const CohortTierActMilestoneType = require('./cohort_tier_act_milestone_type');
const CohortTeamType = require('./cohort_team_type');
const CohortTeamTierActType = require('./cohort_team_tier_act_type');

const CohortTierActType = `
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

module.exports = () => [
  CohortTierActType,
  CohortTierType,
  CohortTierActMilestoneType,
  CohortTeamType,
  CohortTeamTierActType,
];
