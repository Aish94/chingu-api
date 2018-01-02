module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('cohort_channels', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },

    cohort_id: {
      allowNull: true,
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'cohorts',
        key: 'id',
      },
    },

    slack_channel_id: {
      allowNull: true,
      type: Sequelize.STRING,
    },

    title: {
      allowNull: false,
      type: Sequelize.STRING,
    },

    last_slack_scrape_ts: {
      allowNull: true,
      type: Sequelize.STRING,
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

  down: queryInterface => queryInterface.dropTable('cohort_channels'),
};
