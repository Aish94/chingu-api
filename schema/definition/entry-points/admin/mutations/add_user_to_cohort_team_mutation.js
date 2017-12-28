let AddUserToCohortTeamMutation;
let Base;
let CohortTeamCohortUserRoleEnum;
let CohortTeamCohortUserType;

module.exports = () => [
  AddUserToCohortTeamMutation,
  Base,
  CohortTeamCohortUserRoleEnum,
  CohortTeamCohortUserType,
];

Base = require('../../base');
CohortTeamCohortUserRoleEnum = require('../../../enums/cohort_team_cohort_user_role_enum');
CohortTeamCohortUserType = require('../../../types/cohort_team_cohort_user_type');

AddUserToCohortTeamMutation = `
  extend type Mutation {
    addUserToCohortTeam(
      cohort_team_id: ID!,
      cohort_user_id: ID!,
      role: _CohortTeamCohortUserRole!
    ): CohortTeamCohortUser!
  }
`;
