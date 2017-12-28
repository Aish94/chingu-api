let WizardType;
let CohortType;

module.exports = () => [WizardType, CohortType];

CohortType = require('./cohort_type');

WizardType = `
  type Wizard {
    slack_team_id: String!
    slack_team_token: String!
    bot_id: String!
    bot_token: String!
    bot_secret: String!
    cohort: Cohort
  }
`;
