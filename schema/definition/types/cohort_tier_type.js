const CohortType = require('./cohort_type');
const TierType = require('./tier_type');
const CohortTeamType = require('./cohort_team_type');
const CohortUserType = require('./cohort_user_type');
const CohortTierActType = require('./cohort_tier_act_type');

const CohortTierType = `
  type CohortTier {
    id: ID!
    cohort: Cohort!
    tier: Tier!
    teams: [CohortTeam!]!
    users: [CohortUser!]!
    acts: [CohortTierAct!]!
  }
`;

module.exports = () => [
  CohortTierType,
  CohortType,
  TierType,
  CohortTeamType,
  CohortUserType,
  CohortTierActType,
];
