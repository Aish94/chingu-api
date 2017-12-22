module.exports = {
  up: queryInterface => Promise.all([
    queryInterface.removeColumn('cohort_teams', 'tier'),
    queryInterface.removeColumn('cohort_users', 'tier'),
  ]),

  down: (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn('cohort_teams', 'tier', {
      type: Sequelize.INTEGER,
      allowNull: false,
    }),
    queryInterface.addColumn('cohort_users', 'tier', {
      type: Sequelize.INTEGER,
      allowNull: false,
    }),
  ]),
};
