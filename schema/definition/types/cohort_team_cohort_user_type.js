let CohortTeamCohortUserType;
let CohortTeamCohortUserRoleEnum;
let CohortTeamCohortUserStatusEnum;
let CohortUserType;
let CohortTeamType;

module.exports = () => [
  CohortTeamCohortUserType,
  CohortTeamCohortUserRoleEnum,
  CohortTeamCohortUserStatusEnum,
  CohortUserType,
  CohortTeamType,
];

CohortTeamCohortUserRoleEnum = require('../enums/cohort_team_cohort_user_role_enum');
CohortTeamCohortUserStatusEnum = require('../enums/cohort_team_cohort_user_status_enum');
CohortUserType = require('./cohort_user_type');
CohortTeamType = require('./cohort_team_type');

CohortTeamCohortUserType = `
  type CohortTeamCohortUser {
    id: ID!
    role: _CohortTeamCohortUserRole
    status: _CohortTeamCohortUserStatus
    cohort_user: CohortUser!
    cohort_team: CohortTeam!
  }
`;
