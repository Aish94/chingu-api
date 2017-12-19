const WizardInput = `
  input WizardInput {
    slack_team_id: String
    slack_team_token: String
    bot_id: String
    bot_token: String
    cohort_id: Int
  }
`;

module.exports = () => [WizardInput];
