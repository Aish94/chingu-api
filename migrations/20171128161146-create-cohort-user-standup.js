module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('cohort_user_standups', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },

    cohort_user_id: {
      allowNull: false,
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'cohort_users',
        key: 'id',
      },
    },

    cohort_team_standup_id: {
      allowNull: true,
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'cohort_team_standups',
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
      name: 'cohort_user_standups_cohort_user-cohort_team_standup_unique_index',
      singleField: false,
      fields: ['cohort_user_id', 'cohort_team_standup_id'],
    }],
  }),
  down: queryInterface => queryInterface.dropTable('cohort_user_standups'),
};
