const WizardType = require('../../types/wizard_type');

const IntegrateWizardWithCohortMutation = `
  extend type Mutation {
    integrateWizardWithCohort(
      slack_team_id: String!,
      cohort_id: Int!,
      bot_secret: String!
    ): Wizard!
  }
`;

module.exports = () => [IntegrateWizardWithCohortMutation, WizardType];
