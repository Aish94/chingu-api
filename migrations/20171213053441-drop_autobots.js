module.exports = {
  up: queryInterface => queryInterface.dropTable('autobots'),

  down: (queryInterface, Sequelize) => queryInterface.createTable('autobots', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },

    cohort_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
      unique: true,
      onDelete: 'CASCADE',
      references: {
        model: 'cohorts',
        key: 'id',
      },
    },

    slack_team_id: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },

    bot_secret: {
      allowNull: false,
      type: Sequelize.STRING,
    },

    slack_team_token: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },

    bot_id: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    bot_token: {
      type: Sequelize.STRING,
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
  }),
};
