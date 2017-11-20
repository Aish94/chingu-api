'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.changeColumn('projects', 'description', { allowNull: true, type: Sequelize.TEXT }),
  down: (queryInterface, Sequelize) => queryInterface.changeColumn('projects', 'description', { allowNull: false, type: Sequelize.TEXT }),
};
