const CohortInput = require('./cohort_input');
const CohortTierActInput = require('./cohort_tier_act_input');
const CohortTierActMilestoneInput = require('./cohort_tier_act_milestone_input');
const CohortUserInput = require('./cohort_user_input');
const MilestoneInput = require('./milestone_input');
const WizardInput = require('./wizard_input');

module.exports = () => [
  CohortInput,
  CohortTierActInput,
  CohortTierActMilestoneInput,
  CohortUserInput,
  MilestoneInput,
  WizardInput,
];
