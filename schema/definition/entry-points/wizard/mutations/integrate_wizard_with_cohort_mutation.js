let IntegrateWizardWithCohortMutation;
let Base;
let WizardType;

module.exports = () => [IntegrateWizardWithCohortMutation, Base, WizardType];

Base = require('../../base');
WizardType = require('../../../types/wizard_type');

IntegrateWizardWithCohortMutation = `
  extend type Mutation {
    integrateWizardWithCohort(
      slack_team_id: String!,
      cohort_id: Int!,
      bot_secret: String!
    ): Wizard!
  }
`;
