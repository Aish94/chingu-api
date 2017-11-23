module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('groups', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },

    title: {
      allowNull: false,
      unique: true,
      type: Sequelize.STRING,
    },
    group_type: {
      allowNull: false,
      type: Sequelize.ENUM,
      values: ['City', 'Cohort', 'Country'],
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
  down: queryInterface => queryInterface.dropTable('groups'),
};
