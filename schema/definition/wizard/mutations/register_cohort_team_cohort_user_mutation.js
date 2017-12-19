const CohortTeamCohortUserRoleEnum = require('../../enums/cohort_team_cohort_user_role_enum');
const CohortTeamCohortUserType = require('../../types/cohort_team_cohort_user_type');

const RegisterCohortTeamCohortUserMutation = `
  extend type Mutation {
    registerCohortTeamCohortUser(
      slack_team_id: String!,
      slack_channel_id: String!,
      slack_user_id: String!,
      email_base: String!
      role: _CohortTeamCohortUserRole!
    ): CohortTeamCohortUser!
  }
`;

module.exports = () => [
  RegisterCohortTeamCohortUserMutation,
  CohortTeamCohortUserRoleEnum,
  CohortTeamCohortUserType,
];
