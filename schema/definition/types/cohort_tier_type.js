let CohortTierType;
let CohortType;
let TierType;
let CohortTeamType;
let CohortUserType;
let CohortTierActType;

module.exports = () => [
  CohortTierType,
  CohortType,
  TierType,
  CohortTeamType,
  CohortUserType,
  CohortTierActType,
];

CohortType = require('./cohort_type');
TierType = require('./tier_type');
CohortTeamType = require('./cohort_team_type');
CohortUserType = require('./cohort_user_type');
CohortTierActType = require('./cohort_tier_act_type');

CohortTierType = `
  type CohortTier {
    id: ID!
    cohort: Cohort!
    tier: Tier!
    teams: [CohortTeam!]!
    users: [CohortUser!]!
    acts: [CohortTierAct!]!
  }
`;
