module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('cohort_teams', 'cohort_channel_id', {
    type: Sequelize.INTEGER,
    allowNull: true,
    onDelete: 'SET NULL',
    references: {
      model: 'cohort_channels',
      key: 'id',
    },
  }),

  down: queryInterface => queryInterface.removeColumn('cohort_teams', 'cohort_channel_id'),
};
