module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('cohort_teams', 'project_id', {
    type: Sequelize.INTEGER,
    allowNull: true,
    onDelete: 'SET NULL',
    references: {
      model: 'projects',
      key: 'id',
    },
  }),

  down: queryInterface => queryInterface.removeColumn('cohort_teams', 'project_id'),
};
