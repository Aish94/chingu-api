module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.removeColumn('cohort_teams', 'slack_channel_id'),
    queryInterface.addColumn('cohort_teams', 'cohort_channel_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
      onDelete: 'CASCADE',
      references: {
        model: 'cohort_channels',
        key: 'id',
      },
    }),
  ]),

  down: (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn('cohort_teams', 'slack_channel_id', {
      type: Sequelize.STRING,
      allowNull: true,
    }),
    queryInterface.removeColumn('cohort_teams', 'cohort_channel_id'),
  ]),
};
