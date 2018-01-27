module.exports = {
  up: queryInterface => queryInterface.addConstraint(
    'cohort_channels',
    ['title', 'cohort_id'],
    {
      type: 'unique',
      name: 'cohort_channel_title-cohort_unique_index',
    },
  ),

  down: queryInterface => queryInterface.removeConstraint(
    'cohort_channels',
    'cohort_channel_title-cohort_unique_index',
  ),
};
