'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.changeColumn('cohorts', 'start_date', { allowNull: true, type: Sequelize.DATE }),
    queryInterface.changeColumn('cohorts', 'end_date', { allowNull: true, type: Sequelize.DATE }),
  ]),

  down: (queryInterface, Sequelize) => Promise.all([
    queryInterface.changeColumn('cohorts', 'start_date', { allowNull: false, type: Sequelize.DATE }),
    queryInterface.changeColumn('cohorts', 'end_date', { allowNull: false, type: Sequelize.DATE }),
  ]),
};
