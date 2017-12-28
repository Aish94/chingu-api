let CohortUserType;
let CohortUserStatusEnum;
let UserType;
let CohortType;
let TierType;
let CohortTeamType;
let CohortUserStandupType;

module.exports = () => [
  CohortUserType,
  CohortUserStatusEnum,
  UserType,
  CohortType,
  TierType,
  CohortTeamType,
  CohortUserStandupType,
];

CohortUserStatusEnum = require('../enums/cohort_user_status_enum');
UserType = require('./user_type');
CohortType = require('./cohort_type');
TierType = require('./tier_type');
CohortTeamType = require('./cohort_team_type');
CohortUserStandupType = require('./cohort_user_standup_type');

CohortUserType = `
  type CohortUser {
    id: ID!
    status: _CohortUserStatus!
    user: User!
    cohort: Cohort!
    tier: Tier
    team: CohortTeam
    slack_user_id: String 
    standups: [CohortUserStandup!]!
  }
`;
