module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('users', 'auto_generated', {
    allowNull: false,
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  }),

  down: queryInterface => queryInterface.removeColumn('users', 'auto_generated'),
};
