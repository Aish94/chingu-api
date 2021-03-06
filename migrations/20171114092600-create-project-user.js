module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('project_users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },

    user_id: {
      allowNull: false,
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'users',
        key: 'id',
      },
    },
    project_id: {
      allowNull: false,
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'projects',
        key: 'id',
      },
    },

    role: {
      allowNull: false,
      type: Sequelize.ENUM,
      values: ['project_manager', 'collaborator'],
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
      name: 'project_users_user-project_unique_index',
      singleField: false,
      fields: ['user_id', 'project_id'],
    }],
  }),
  down: queryInterface => queryInterface.dropTable('project_users'),
};
