module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn('cohort_teams', 'standup_schedule', {
      allowNull: false,
      type: Sequelize.STRING,
      defaultValue: '1,4',
    }),
    queryInterface.addColumn('cohort_tiers', 'standup_schedule', {
      allowNull: false,
      type: Sequelize.STRING,
      defaultValue: '1,4',
    }),
  ]),

  down: queryInterface => Promise.all([
    queryInterface.removeColumn('cohort_teams', 'standup_schedule'),
    queryInterface.removeColumn('cohort_tiers', 'standup_schedule'),
  ]),
};
