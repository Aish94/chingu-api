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
      type: Sequelize.ENUM,
      allowNull: false,
      values: [1, 2, 3, 4],
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
  down: queryInterface => queryInterface.dropTable('cohort_users'),
};
