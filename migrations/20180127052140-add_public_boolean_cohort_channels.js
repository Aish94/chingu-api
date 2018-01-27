module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('cohort_channels', 'public_channel', {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  }),

  down: queryInterface => queryInterface.removeColumn('cohort_channels', 'public_channel'),
};
