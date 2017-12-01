module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('cohort_tier_acts', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },

    cohort_tier_id: {
      allowNull: false,
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'cohort_tiers',
        key: 'id',
      },
    },

    title: {
      allowNull: false,
      type: Sequelize.STRING,
    },

    order_index: {
      allowNull: false,
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },

    repeatable: {
      allowNull: false,
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },

    created_at: {
      allowNull: false,
      type: Sequelize.DATE,
    },

    updated_at: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: queryInterface => queryInterface.dropTable('cohort_tier_acts'),
};
