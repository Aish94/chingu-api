module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('cohort_team_milestones', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },

    cohort_team_id: {
      allowNull: false,
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'cohort_teams',
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
      name: 'cohort_team_milestones_cohort_team-cohort_tier_act_milestone_unique_index',
      singleField: false,
      fields: ['cohort_team_id', 'cohort_tier_act_milestone_id'],
    }],
  }),
  down: queryInterface => queryInterface.dropTable('cohort_team_milestones'),
};
