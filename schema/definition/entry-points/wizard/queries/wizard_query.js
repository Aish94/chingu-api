let WizardQuery;
let Base;
let WizardType;

module.exports = () => [WizardQuery, Base, WizardType];

Base = require('../../base');
WizardType = require('../../../types/wizard_type');

WizardQuery = `
  extend type Query {
    wizard(slack_team_id: String!): Wizard
  }
`;
