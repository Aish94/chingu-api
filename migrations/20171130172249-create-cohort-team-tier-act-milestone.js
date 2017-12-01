module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('cohort_team_tier_act_milestones', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },

    cohort_team_tier_act_id: {
      allowNull: false,
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'cohort_team_tier_acts',
        key: 'id',
      },
    },

    cohort_tier_act_milestone_id: {
      allowNull: false,
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'cohort_tier_act_milestones',
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
      name: 'cohort_team_tier_act_milestone_unique_index',
      singleField: false,
      fields: ['cohort_tier_act_milestone_id', 'cohort_team_tier_act_id'],
    }],
  }),
  down: queryInterface => queryInterface.dropTable('cohort_team_tier_act_milestones'),
};
