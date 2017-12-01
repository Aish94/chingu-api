module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('cohort_tier_act_milestones', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },

    cohort_tier_act_id: {
      allowNull: false,
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'cohort_tier_acts',
        key: 'id',
      },
    },

    milestone_id: {
      allowNull: false,
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'milestones',
        key: 'id',
      },
    },

    order_index: {
      allowNull: false,
      type: Sequelize.INTEGER,
      defaultValue: 0,
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
  down: queryInterface => queryInterface.dropTable('cohort_tier_act_milestones'),
};
