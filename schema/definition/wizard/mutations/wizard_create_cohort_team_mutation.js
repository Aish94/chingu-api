const CohortTeamType = require('../../types/cohort_team_type');

const WizardCreateCohortTeamMutation = `
  extend type Mutation {
    wizardCreateCohortTeam(
      slack_team_id: String!,
      title: String!,
      slack_channel_id: String!
      slack_user_id: String!
    ): CohortTeam!
  }
`;

module.exports = () => [WizardCreateCohortTeamMutation, CohortTeamType];
