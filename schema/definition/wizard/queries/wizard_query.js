const WizardType = require('../../types/wizard_type');

const WizardQuery = `
  extend type Query {
    wizard(slack_team_id: String!): Wizard
  }
`;

module.exports = () => [WizardQuery, WizardType];
