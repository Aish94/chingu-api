module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('cohort_team_tier_acts', {
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

    cohort_team_id: {
      allowNull: false,
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'cohort_teams',
        key: 'id',
      },
    },

    repetition: {
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
  down: queryInterface => queryInterface.dropTable('cohort_team_tier_acts'),
};
