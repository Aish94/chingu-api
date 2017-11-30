module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('milestones', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },

    title: {
      allowNull: false,
      type: Sequelize.STRING,
    },

    description: {
      allowNull: true,
      type: Sequelize.TEXT,
    },

    resource_url: {
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
  down: queryInterface => queryInterface.dropTable('milestones'),
};
