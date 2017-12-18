module.exports = {
  up: queryInterface => queryInterface.addConstraint(
    'cohort_tier_act_milestones',
    ['milestone_id', 'cohort_tier_act_id'],
    {
      type: 'unique',
      name: 'cohort_tier_act_milestones_milestone-cohort_tier_act_unique_index',
    },
  ),

  down: queryInterface => queryInterface.removeConstraint(
    'cohort_tier_act_milestones',
    'cohort_tier_act_milestones_milestone-cohort_tier_act_unique_index',
  ),
};
