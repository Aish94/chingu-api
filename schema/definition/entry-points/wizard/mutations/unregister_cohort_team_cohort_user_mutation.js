let UnregisterCohortTeamCohortUserMutation;
let Base;
let CohortTeamCohortUserType;

module.exports = () => [
  UnregisterCohortTeamCohortUserMutation,
  Base,
  CohortTeamCohortUserType,
];

Base = require('../../base');
CohortTeamCohortUserType = require('../../../types/cohort_team_cohort_user_type');

UnregisterCohortTeamCohortUserMutation = `
  extend type Mutation {
    unregisterCohortTeamCohortUser(
      slack_team_id: String!,
      slack_channel_id: String!,
      slack_user_id: String!
      admin_slack_user_id: String!
    ): CohortTeamCohortUser!
  }
`;
