module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('cohort_channels', 'is_public', {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  }),

  down: queryInterface => queryInterface.removeColumn('cohort_channels', 'is_public'),
};
