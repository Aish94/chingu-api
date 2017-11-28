module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('cohort_users', 'slack_user_id', {
    type: Sequelize.STRING,
    allowNull: true,
  }),

  down: queryInterface => queryInterface.removeColumn('cohort_users', 'slack_user_id'),
};
