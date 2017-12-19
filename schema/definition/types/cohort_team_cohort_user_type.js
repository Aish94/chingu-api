const CohortTeamCohortUserRoleEnum = require('../enums/cohort_team_cohort_user_role_enum');
const CohortTeamCohortUserStatusEnum = require('../enums/cohort_team_cohort_user_status_enum');
const CohortUserType = require('./cohort_user_type');
const CohortTeamType = require('./cohort_team_type');

const CohortTeamCohortUserType = `
  type CohortTeamCohortUser {
    id: ID!
    role: _CohortTeamCohortUserRole
    status: _CohortTeamCohortUserStatus
    cohort_user: CohortUser!
    cohort_team: CohortTeam!
  }
`;

module.exports = () => [
  CohortTeamCohortUserType,
  CohortTeamCohortUserRoleEnum,
  CohortTeamCohortUserStatusEnum,
  CohortUserType,
  CohortTeamType,
];
