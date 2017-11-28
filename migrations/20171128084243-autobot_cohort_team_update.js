module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('cohort_teams', 'slack_channel_id', {
    type: Sequelize.STRING,
    allowNull: true,
  }),

  down: queryInterface => queryInterface.removeColumn('cohort_teams', 'slack_channel_id'),
};
