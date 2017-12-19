const CreateUserMutation = require('./create_user_mutation');
const JoinCohortMutation = require('./join_cohort_mutation');
const SignInUserMutation = require('./sign_in_user_mutation');
const UpdateUserMutation = require('./update_user_mutation');

module.exports = () => [
  CreateUserMutation,
  JoinCohortMutation,
  SignInUserMutation,
  UpdateUserMutation,
];
