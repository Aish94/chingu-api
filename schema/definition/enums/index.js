const CohortStatusEnum = require('./cohort_status_enum');
const CohortTeamCohortUserRoleEnum = require('./cohort_team_cohort_user_role_enum');
const CohortTeamCohortUserStatusEnum = require('./cohort_team_cohort_user_status_enum');
const CohortUserStatusEnum = require('./cohort_user_status_enum');
const UserStatusEnum = require('./user_status_enum');

module.exports = () => [
  CohortStatusEnum,
  CohortTeamCohortUserRoleEnum,
  CohortTeamCohortUserStatusEnum,
  CohortUserStatusEnum,
  UserStatusEnum,
];
