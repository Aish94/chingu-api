const CohortType = require('./cohort_type');
const ProjectType = require('./project_type');
const TierType = require('./tier_type');
const CohortTeamCohortUserType = require('./cohort_team_cohort_user_type');
const CohortUserType = require('./cohort_user_type');
const CohortTeamStandupType = require('./cohort_team_standup_type');
const CohortTeamTierActType = require('./cohort_team_tier_act_type');

const CohortTeamType = `
  type CohortTeam {
    id: ID!
    title: String!
    slack_channel_id: String!
    cohort: Cohort!
    project: Project!
    tier: Tier!
    members: [CohortTeamCohortUser!]!
    cohort_users: [CohortUser!]!
    standups: [CohortTeamStandup!]!
    team_acts: [CohortTeamTierAct!]!
  }
`;

module.exports = () => [
  CohortTeamType,
  CohortType,
  ProjectType,
  TierType,
  CohortTeamCohortUserType,
  CohortUserType,
  CohortTeamStandupType,
  CohortTeamTierActType,
];
