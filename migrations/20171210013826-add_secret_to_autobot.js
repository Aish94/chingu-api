module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('autobots', 'bot_secret', {
    allowNull: false,
    type: Sequelize.STRING,
  }),

  down: queryInterface => queryInterface.removeColumn('autobots', 'bot_secret'),
};
