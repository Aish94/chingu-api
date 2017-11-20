module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('users', 'bio', {
    allowNull: true,
    type: Sequelize.TEXT,
  }),

  down: queryInterface => queryInterface.removeColumn('users', 'bio'),
};
