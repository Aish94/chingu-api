module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('cohort_tiers', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },

    cohort_id: {
      allowNull: false,
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'cohorts',
        key: 'id',
      },
    },
    tier_id: {
      allowNull: false,
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'tiers',
        key: 'id',
      },
    },

    created_at: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updated_at: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }, {
    uniqueKeys: [{
      name: 'cohort_tiers_cohort-tier_unique_index',
      singleField: false,
      fields: ['cohort_id', 'tier_id'],
    }],
  }),
  down: queryInterface => queryInterface.dropTable('cohort_tiers'),
};
