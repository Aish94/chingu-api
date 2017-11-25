module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('cities', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },

    group_id: {
      allowNull: true,
      type: Sequelize.INTEGER,
      onDelete: 'SET NULL',
      references: {
        model: 'groups',
        key: 'id',
      },
    },
    country_id: {
      allowNull: false,
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'countries',
        key: 'id',
      },
    },

    name: {
      allowNull: false,
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
  down: queryInterface => queryInterface.dropTable('cities'),
};
