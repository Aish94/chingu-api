const CohortTeamCohortUserRoleEnum = require('../../enums/cohort_team_cohort_user_role_enum');
const CohortTeamCohortUserType = require('../../types/cohort_team_cohort_user_type');

const AddUserToCohortTeamMutation = `
  extend type Mutation {
    addUserToCohortTeam(
      cohort_team_id: ID!,
      cohort_user_id: ID!,
      role: _CohortTeamCohortUserRole!
    ): CohortTeamCohortUser!
  }
`;

module.exports = () => [
  AddUserToCohortTeamMutation,
  CohortTeamCohortUserRoleEnum,
  CohortTeamCohortUserType,
];
