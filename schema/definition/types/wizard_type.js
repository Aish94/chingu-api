const CohortType = require('./cohort_type');

const WizardType = `
  type Wizard {
    slack_team_id: String!
    slack_team_token: String!
    bot_id: String!
    bot_token: String!
    bot_secret: String!
    cohort: Cohort
  }
`;

module.exports = () => [WizardType, CohortType];
