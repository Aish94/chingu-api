module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn('cohort_user_standups', 'standup_type', {
      allowNull: false,
      type: Sequelize.ENUM,
      values: ['user_log', 'user_checkin', 'manager_update'],
    }),
    queryInterface.addColumn('cohort_user_standups', 'standup', {
      allowNull: false,
      type: Sequelize.JSONB,
    }),
  ]),

  down: queryInterface => Promise.all([
    queryInterface.removeColumn('cohort_user_standups', 'standup_type'),
    queryInterface.removeColumn('cohort_user_standups', 'standup'),
  ]),
};
