let WizardCreateCohortTeamMutation;
let Base;
let CohortTeamType;

module.exports = () => [WizardCreateCohortTeamMutation, Base, CohortTeamType];

Base = require('../../base');
CohortTeamType = require('../../../types/cohort_team_type');

WizardCreateCohortTeamMutation = `
  extend type Mutation {
    wizardCreateCohortTeam(
      slack_team_id: String!,
      title: String!,
      slack_channel_id: String!
      slack_user_id: String!
    ): CohortTeam!
  }
`;
