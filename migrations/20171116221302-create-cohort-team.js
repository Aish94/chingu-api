module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('cohort_teams', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
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
    project_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'projects',
        key: 'id',
      },
    },

    title: {
      type: Sequelize.STRING,
      allowNull: false,
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
      name: 'cohort_team_cohort-project_unique_index',
      singleField: false,
      fields: ['cohort_id', 'project_id'],
    }],
  }),
  down: queryInterface => queryInterface.dropTable('cohort_teams'),
};
