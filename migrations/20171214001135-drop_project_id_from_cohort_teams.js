module.exports = {
  up: queryInterface => queryInterface.removeColumn('cohort_teams', 'project_id'),

  down: (queryInterface, Sequelize) => queryInterface.addColumn('cohort_teams', 'project_id', {
    type: Sequelize.INTEGER,
    allowNull: false,
    onDelete: 'CASCADE',
    references: {
      model: 'projects',
      key: 'id',
    },
  }),
};
