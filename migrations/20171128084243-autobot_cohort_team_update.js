module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('cohort_teams', 'slack_channel_id', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('cohort_teams', 'slack_channel_id');
  },
};
