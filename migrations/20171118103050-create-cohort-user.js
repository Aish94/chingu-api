module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('cohort_users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },

    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'users',
        key: 'id',
      },
    },
    cohort_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'cohorts',
        key: 'id',
      },
    },

    status: {
      allowNull: false,
      type: Sequelize.ENUM,
      values: [
        'pending_approval',
        'rejected',
        'accepted',
        'tier_assigned',
        'team_assigned',
      ],
      defaultValue: 'pending_approval',
    },
    tier: {
      type: Sequelize.INTEGER,
      allowNull: false,
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
      name: 'cohort_users_cohort-user_unique_index',
      singleField: false,
      fields: ['user_id', 'cohort_id'],
    }],
  }),
  down: queryInterface => queryInterface.dropTable('cohort_users'),
};
