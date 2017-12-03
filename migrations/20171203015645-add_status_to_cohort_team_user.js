module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('cohort_team_users', 'status', {
    allowNull: false,
    type: Sequelize.ENUM,
    values: ['active', 'removed', 'reassigned'],
    defaultValue: 'active',
  }),

  down: queryInterface => queryInterface.removeColumn('cohort_team_users', 'status'),
};
