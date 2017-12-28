let RegisterCohortTeamCohortUserMutation;
let Base;
let CohortTeamCohortUserRoleEnum;
let CohortTeamCohortUserType;

module.exports = () => [
  RegisterCohortTeamCohortUserMutation,
  Base,
  CohortTeamCohortUserRoleEnum,
  CohortTeamCohortUserType,
];

Base = require('../../base');
CohortTeamCohortUserRoleEnum = require('../../../enums/cohort_team_cohort_user_role_enum');
CohortTeamCohortUserType = require('../../../types/cohort_team_cohort_user_type');

RegisterCohortTeamCohortUserMutation = `
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
