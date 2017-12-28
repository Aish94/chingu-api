let createWizardMutation;
let Base;
let WizardInput;
let WizardType;

module.exports = () => [createWizardMutation, Base, WizardInput, WizardType];

Base = require('../../base');
WizardInput = require('../../../inputs/wizard_input');
WizardType = require('../../../types/wizard_type');

createWizardMutation = `
  extend type Mutation {
    createWizard(wizard_data: WizardInput!): Wizard!
  }
`;
