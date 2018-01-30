module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('cohort_channels', 'channel_type', {
    type: Sequelize.ENUM,
    allowNull: false,
    values: ['admin', 'team', 'public'],
  }),

  down: queryInterface => queryInterface.removeColumn('cohort_channels', 'channel_type'),
};
