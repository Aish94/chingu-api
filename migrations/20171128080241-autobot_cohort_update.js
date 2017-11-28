module.exports = {
  up: (queryInterface, Sequelize) =>
  queryInterface.addColumn('cohorts', 'slack_team_token', {
    type: Sequelize.STRING,
    allowNull: true,
  }).then(() =>
  queryInterface.addColumn('cohorts', 'slack_bot_token', {
    type: Sequelize.STRING,
    allowNull: true,
  })).then(() => 
  queryInterface.addColumn('cohorts', 'slack_team_id', {
    type: Sequelize.STRING,
    allowNull: true,
  })).then(() =>
  queryInterface.addColumn('cohorts', 'autobot_id', {
    type: Sequelize.STRING,
    allowNull: true,
  })),

  down: (queryInterface, Sequelize) =>
  queryInterface.removeColumn('cohorts', 'slack_team_token')
  .then(() =>
  queryInterface.removeColumn('cohorts', 'slack_bot_token'))
  .then(() =>
  queryInterface.removeColumn('cohorts', 'slack_team_id'))
  .then(() =>
  queryInterface.removeColumn('cohorts', 'autobot_id')),
};
