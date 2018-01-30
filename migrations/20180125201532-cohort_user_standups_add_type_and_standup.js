module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn(
    'cohort_user_standups', 'standup', {
      allowNull: false,
      type: Sequelize.JSONB,
    }),

  down: queryInterface => queryInterface.removeColumn('cohort_user_standups', 'standup'),
};
