const CohortUserStatusEnum = require('../enums/cohort_user_status_enum');
const UserType = require('./user_type');
const CohortType = require('./cohort_type');
const TierType = require('./tier_type');
const CohortTeamType = require('./cohort_team_type');
const CohortUserStandupType = require('./cohort_user_standup_type');

const CohortUserType = `
  type CohortUser {
    id: ID!
    status: _CohortUserStatus!
    user: User!
    cohort: Cohort!
    tier: Tier
    team: CohortTeam
    standups: [CohortUserStandup!]!
  }
`;

module.exports = () => [
  CohortUserType,
  CohortUserStatusEnum,
  UserType,
  CohortType,
  TierType,
  CohortTeamType,
  CohortUserStandupType,
];
