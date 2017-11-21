module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('tiers', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },

    level: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
    title: {
      allowNull: false,
      unique: true,
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
  down: queryInterface => queryInterface.dropTable('tiers'),
};
