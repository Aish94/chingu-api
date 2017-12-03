module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('cohort_team_users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },

    cohort_team_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'cohort_teams',
        key: 'id',
      },
    },

    cohort_user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'cohort_users',
        key: 'id',
      },
    },

    status: {
      allowNull: false,
      type: Sequelize.ENUM,
      values: ['active', 'removed', 'reassigned'],
      defaultValue: 'active',
    },

    role: {
      type: Sequelize.ENUM,
      allowNull: false,
      values: ['project_manager', 'member'],
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
      name: 'cohort_team_users_cohort_user-cohort_team_unique_index',
      singleField: false,
      fields: ['cohort_user_id', 'cohort_team_id'],
    }],
  }),
  down: queryInterface => queryInterface.dropTable('cohort_team_users'),
};
