const CohortTeamQuery = require('./cohort_team_query');
const CohortTeamsQuery = require('./cohort_teams_query');
const GetNextMilestoneQuery = require('./get_next_milestone_query');
const WizardQuery = require('./wizard_query');

module.exports = () => [
  CohortTeamQuery,
  CohortTeamsQuery,
  GetNextMilestoneQuery,
  WizardQuery,
];
