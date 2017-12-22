module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn('cohorts', 'slack_team_token', {
      type: Sequelize.STRING,
      allowNull: true,
    }),
    queryInterface.addColumn('cohorts', 'slack_bot_token', {
      type: Sequelize.STRING,
      allowNull: true,
    }),
    queryInterface.addColumn('cohorts', 'slack_team_id', {
      type: Sequelize.STRING,
      allowNull: true,
    }),
    queryInterface.addColumn('cohorts', 'autobot_id', {
      type: Sequelize.STRING,
      allowNull: true,
    }),
  ]),

  down: queryInterface => Promise.all([
    queryInterface.removeColumn('cohorts', 'slack_team_token'),
    queryInterface.removeColumn('cohorts', 'slack_bot_token'),
    queryInterface.removeColumn('cohorts', 'slack_team_id'),
    queryInterface.removeColumn('cohorts', 'autobot_id'),
  ]),
};
