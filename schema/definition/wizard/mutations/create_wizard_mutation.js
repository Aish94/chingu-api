const WizardInput = require('../../inputs/wizard_input');
const WizardType = require('../../types/wizard_type');

const createWizardMutation = `
  extend type Mutation {
    createWizard(wizard_data: WizardInput!): Wizard!
  }
`;

module.exports = () => [createWizardMutation, WizardInput, WizardType];
