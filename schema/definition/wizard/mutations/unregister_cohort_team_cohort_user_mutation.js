const CohortTeamCohortUserType = require('../../types/cohort_team_cohort_user_type');

const UnregisterCohortTeamCohortUserMutation = `
  extend type Mutation {
    unregisterCohortTeamCohortUser(
      slack_team_id: String!,
      slack_channel_id: String!,
      slack_user_id: String!
      admin_slack_user_id: String!
    ): CohortTeamCohortUser!
  }
`;

module.exports = () => [
  UnregisterCohortTeamCohortUserMutation,
  CohortTeamCohortUserType,
];
