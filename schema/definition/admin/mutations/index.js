const AddTierToCohortMutation = require('./add_tier_to_cohort_mutation');
const AddUserToCohortTeamMutation = require('./add_user_to_cohort_team_mutation');
const AddUsersToCohortMutation = require('./add_users_to_cohort_mutation');
const CreateCityMutation = require('./create_city_mutation');
const CreateCohortMutation = require('./create_country_mutation');
const CreateCohortTeamMutation = require('./create_cohort_team_mutation');
const CreateCohortTierActMilestoneMutation = require('./create_cohort_tier_act_milestone_mutation');
const CreateCohortTierActMutation = require('./create_cohort_tier_act_mutation');
const CreateCountryMutation = require('./create_country_mutation');
const CreateTierMutation = require('./create_tier_mutation');
const UpdateCohortMutation = require('./update_cohort_mutation');
const UpdateCohortUserMutation = require('./update_cohort_user_mutation');
const UpdateUserStatusMutation = require('./update_user_status_mutation');

module.exports = () => [
  AddTierToCohortMutation,
  AddUserToCohortTeamMutation,
  AddUsersToCohortMutation,
  CreateCityMutation,
  CreateCohortMutation,
  CreateCohortTeamMutation,
  CreateCohortTierActMilestoneMutation,
  CreateCohortTierActMutation,
  CreateCountryMutation,
  CreateTierMutation,
  UpdateCohortMutation,
  UpdateCohortUserMutation,
  UpdateUserStatusMutation,
];
