module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('cohort_channel_users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },

    cohort_channel_id: {
      allowNull: true,
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'cohort_channels',
        key: 'id',
      },
    },

    cohort_user_id: {
      allowNull: true,
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'cohort_users',
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
      name: 'cohort_channel_users_cohort_channel-cohort_user_unique_index',
      singleField: false,
      fields: ['cohort_channel_id', 'cohort_user_id'],
    }],
  }),

  down: queryInterface => queryInterface.dropTable('cohort_channel_users'),
};
