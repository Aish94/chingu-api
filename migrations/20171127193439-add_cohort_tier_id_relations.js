module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn('cohort_teams', 'cohort_tier_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'cohort_tiers',
        key: 'id',
      },
    }),
    queryInterface.addColumn('cohort_users', 'cohort_tier_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'cohort_tiers',
        key: 'id',
      },
    }),
  ]),

  down: queryInterface => Promise.all([
    queryInterface.removeColumn('cohort_teams', 'cohort_tier_id'),
    queryInterface.removeColumn('cohort_users', 'cohort_tier_id'),
  ]),
};
