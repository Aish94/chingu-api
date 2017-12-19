const CreateWizardMutation = require('./create_wizard_mutation');
const IntegrateWizardWithCohortMutation = require('./integrate_wizard_with_cohort_mutation');
const RegisterCohortTeamCohortUserMutation = require('./register_cohort_team_cohort_user_mutation');
const UnregisterCohortTeamCohortUserMutation = require('./unregister_cohort_team_cohort_user_mutation');
const SubmitMilestoneMutation = require('./submit_milestone_mutation');
const WizardCreateCohortTeamMutation = require('./wizard_create_cohort_team_mutation');

module.exports = () => [
  CreateWizardMutation,
  IntegrateWizardWithCohortMutation,
  RegisterCohortTeamCohortUserMutation,
  UnregisterCohortTeamCohortUserMutation,
  SubmitMilestoneMutation,
  WizardCreateCohortTeamMutation,
];
